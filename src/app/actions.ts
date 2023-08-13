"use server"

import { auth } from "@/lib/auth"
import { Session } from "next-auth/types"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { readingTime, slugify } from "@/lib/utils"
import { User } from "../../types"

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
  const userId = session?.user?.id as string

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
  revalidatePath("/")
  return { addedFollow }
}

export async function toggleFollwoUser(userId: string, path: string) {
  const session = await getSession()
  const currentUserId = session.user?.id as string

  const followsUser = await prisma.user.findFirst({
    where: {
      id: userId,
      followers: {
        some: {
          id: currentUserId,
        },
      },
    },
  })

  let addedFollow

  if (followsUser == null) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followers: {
          connect: {
            id: currentUserId,
          },
        },
      },
    })
    addedFollow = true
  } else {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followers: {
          disconnect: {
            id: currentUserId,
          },
        },
      },
    })
    addedFollow = false
  }

  revalidatePath(path)
  revalidatePath("/")
  return { addedFollow }
}

export async function toggleLikeStory(storySlug: string) {
  const session = await getSession()
  const userId = session?.user?.id as string

  const data = {
    userId,
    storySlug,
  }

  const likedStory = await prisma.like.findUnique({
    where: {
      userId_storySlug: data,
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
        userId_storySlug: data,
      },
    })
    addedLike = false
  }

  revalidatePath(`/story/${storySlug}`)
  return { addedLike }
}

export async function saveComment(comment: string, storySlug: string) {
  const session = await getSession()
  const userId = session?.user?.id as string

  const newComment = await prisma.comment.create({
    data: {
      userId,
      storySlug,
      comment,
    },
  })

  revalidatePath(`/story/${storySlug}`)
  return { comment: newComment }
}

export async function bookmarkStory(storySlug: string) {
  const session = await getSession()
  const userId = session?.user?.id as string

  const isBookmarked = await prisma.user.findUnique({
    where: {
      id: userId,
      saved: {
        hasSome: [storySlug],
      },
    },
  })

  let savedStory

  if (isBookmarked == null) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        saved: {
          push: storySlug,
        },
      },
    })
    savedStory = true
  } else {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        saved: isBookmarked.saved.filter((v) => v !== storySlug),
      },
    })
    savedStory = false
  }

  revalidatePath(`/story/${storySlug}`)
  return { savedStory }
}

export async function isUsedUsername(name: string) {
  let username = slugify(name, true)

  if (!username.startsWith("@")) {
    username = "@" + username
  }

  const usernameExists = await prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      username: true,
    },
  })

  return usernameExists
}

export async function updateprofile(profile: Partial<User>) {
  const session = await getSession()
  const userId = session?.user?.id as string

  const res = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...profile,
    },
  })

  return res
}
