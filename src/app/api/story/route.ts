import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const session = await auth()
  const userId = session?.user?.id as string

  const url = new URL(request.url)
  const tag = url.searchParams.get("tag") ?? ""
  const limit = url.searchParams.get("limit") ?? 10
  const cursor = url.searchParams.get("cursor") ?? ""

  let stories = []

  try {
    if (!tag) {
      const tags = await prisma.tag.findMany({
        where: {
          followers: {
            some: {
              id: userId,
            },
          },
        },
      })

      stories = await prisma.story.findMany({
        where: {
          tags: {
            some: {
              id: {
                in: [...tags.map((t) => t.id)],
              },
            },
          },
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          tags: true,
        },
        orderBy: {
          created_at: "desc",
        },
        take: Number(limit) + 1,
        cursor: cursor ? { id: cursor } : undefined,
      })
    } else if (tag === "following") {
      stories = await prisma.story.findMany({
        where: {
          user: {
            followers: {
              some: {
                id: userId,
              },
            },
          },
        },
        include: {
          user: true,
          tags: true,
        },
        orderBy: {
          created_at: "desc",
        },
        take: Number(limit) + 1,
        cursor: cursor ? { id: cursor } : undefined,
      })
    } else {
      stories = await prisma.story.findMany({
        where: {
          tags: {
            some: {
              title: { contains: tag, mode: "insensitive" },
            },
          },
        },
        include: {
          user: true,
          tags: true,
        },
        orderBy: {
          created_at: "desc",
        },
        take: Number(limit) + 1,
        cursor: cursor ? { id: cursor } : undefined,
      })
    }

    let nextCursor: { id: string } | undefined
    if (stories.length > Number(limit)) {
      const nextItem = stories.pop()
      if (nextItem != null) {
        nextCursor = { id: nextItem.id }
      }
    }

    return NextResponse.json({
      stories,
      nextCursor,
    })
  } catch (e) {
    console.log(e)
  }
}
