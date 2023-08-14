"use server"

import { auth } from "@/lib/auth"
import { Session } from "next-auth/types"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { readingTime, slugify } from "@/lib/utils"
import { User } from "../../types"
import { redirect } from "next/navigation"

export async function getSession(): Promise<Session> {
  const session = await auth()

  if (!session || !session?.user) {
    redirect("/auth/login")
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

export async function updateStory({
  id,
  title,
  content,
  description,
  thumbnail,
  tags,
}: {
  id: string
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
    if (checkSlug == null || (checkSlug.id === id && checkSlug.slug === slug))
      break
    i += 1
    slug = slugify(`${title}-${i}`)
  }
  slug = slug.toLowerCase()

  try {
    const currentstory = await prisma.story.findUnique({
      where: {
        id,
      },
    })

    if (currentstory?.userId !== userId) {
      return {
        success: false,
        msg: "You're not allowed to perform this action!",
      }
    }

    const story = await prisma.story.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        description,
        thumbnail: thumbnail ?? undefined,
        slug,
        min_read,
        tags: {
          connect: tags.map((t) => ({ id: t })),
        },
      },
    })

    revalidatePath("/")
    return {
      success: true,
      msg: `Story ${story.title} updated successfully`,
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

export async function updateprofile(
  profile: Partial<User> & {
    location: { city: string; country: string }
    socials: { instagram: string | null; github: string | null } | undefined
  }
) {
  const session = await getSession()
  const userId = session?.user?.id as string

  const updatedProfile = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...profile,
    },
  })

  if (updatedProfile) {
    return {
      success: true,
      message: "Profile updated successfully!",
    }
  } else {
    return {
      success: false,
      message: "Profile update failed!",
    }
  }
}

export async function deactivate() {
  const session = await getSession()
  const userId = session?.user?.id as string

  const res = await prisma.user.delete({
    where: {
      id: userId,
    },
  })

  if (res) {
    return { success: true }
  } else {
    return { success: false }
  }
}
