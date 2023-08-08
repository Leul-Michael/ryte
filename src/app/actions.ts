"use server"

import { auth } from "@/lib/auth"
import { Session } from "next-auth/types"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { readingTime, slugify } from "@/lib/utils"

export async function getSession(): Promise<Session> {
  const session = await auth()

  if (!session) {
    throw new Error("Unauthorized!")
  }

  return session
}

export async function saveStory({
  title,
  content,
  description,
  thumbnail,
  tags,
}: {
  title: string
  content: string
  description: {
    text: string
    in_content: boolean
  }
  thumbnail?: any
  tags: string[]
}) {
  const session = await getSession()
  const userId = session.user?.id as string

  const min_read = readingTime(content)

  let slug = slugify(`${title}`)
  let i = 0

  while (true) {
    const checkSlug = await prisma.story.findFirst({
      where: {
        slug,
      },
    })
    if (checkSlug == null) break
    i += 1
    slug = slugify(`${title}-${i}`)
  }
  slug = slug.toLowerCase()

  try {
    const story = await prisma.story.create({
      data: {
        title,
        content,
        description,
        thumbnail: thumbnail ?? null,
        slug,
        min_read,
        user: {
          connect: {
            id: userId,
          },
        },
        tags: {
          connect: tags.map((t) => ({ id: t })),
        },
      },
    })

    revalidatePath("/")
    return {
      story,
      msg: `Story ${story.title} created successfully`,
    }
  } catch (e: any) {
    console.log(e)
  }
}

export async function toggleFollwoTag(tagId: string) {
  const session = await getSession()
  const userId = session.user?.id as string

  const followsTag = await prisma.tag.findFirst({
    where: {
      id: tagId,
      followers: {
        some: {
          id: userId,
        },
      },
    },
  })

  let addedFollow

  if (followsTag == null) {
    await prisma.tag.update({
      where: {
        id: tagId,
      },
      data: {
        followers: {
          connect: {
            id: userId,
          },
        },
      },
    })
    addedFollow = true
  } else {
    await prisma.tag.update({
      where: {
        id: tagId,
      },
      data: {
        followers: {
          disconnect: {
            id: userId,
          },
        },
      },
    })
    addedFollow = false
  }

  revalidatePath("/tag")
  return { addedFollow }
}

export async function toggleLikeStory(storyId: string, storySlug: string) {
  const session = await getSession()
  const userId = session?.user?.id as string

  const data = {
    userId,
    storyId,
  }

  const likedStory = await prisma.like.findUnique({
    where: {
      userId_storyId: data,
    },
  })

  let addedLike

  if (likedStory == null) {
    await prisma.like.create({
      data,
    })
    addedLike = true
  } else {
    await prisma.like.delete({
      where: {
        userId_storyId: data,
      },
    })
    addedLike = false
  }

  revalidatePath(`/story/${storySlug}`)
  return { addedLike }
}

export async function saveComment(comment: string, storyId: string) {
  const session = await getSession()
  const userId = session?.user?.id as string

  const newComment = await prisma.comment.create({
    data: {
      userId,
      storyId,
      comment,
    },
  })

  return { comment: newComment }
}
