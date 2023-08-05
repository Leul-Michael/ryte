"use server"

import { auth } from "@/lib/auth"
import { Session } from "next-auth/types"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { slugify } from "@/lib/utils"

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
  tags,
}: {
  title: string
  content: string
  tags: string[]
}) {
  const session = await getSession()
  const userId = session.user?.id as string

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
        slug,
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
