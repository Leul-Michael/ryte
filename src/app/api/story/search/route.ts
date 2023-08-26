import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const session = await auth()
  const userId = session?.user?.id as string

  const url = new URL(request.url)
  const title = url.searchParams.get("title") ?? ""
  const limit = url.searchParams.get("limit") ?? 10
  const cursor = url.searchParams.get("cursor") ?? ""
  const sort = url.searchParams.get("sort") ?? ""

  let sortByOption = {}
  if (sort === "new") {
    sortByOption = {
      created_at: "desc",
    }
  } else if (sort === "following") {
    sortByOption = {
      user: {
        follows: {
          _count: "desc",
        },
      },
    }
  } else {
    sortByOption = [
      {
        likes: {
          _count: "desc",
        },
      },
      {
        comments: {
          _count: "desc",
        },
      },
    ]
  }

  let data = []

  try {
    data = await prisma.story.findMany({
      where: {
        OR: [
          { title: { contains: title, mode: "insensitive" } },
          {
            tags: {
              some: {
                title: { contains: title, mode: "insensitive" },
              },
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        thumbnail: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        tags: true,
        _count: {
          select: { likes: true, comments: true },
        },
        likes:
          userId == null
            ? false
            : {
                where: {
                  userId,
                },
              },
        created_at: true,
      },
      orderBy: sortByOption,
      take: Number(limit) + 1,
      cursor: cursor ? { id: cursor } : undefined,
    })

    let nextCursor: { id: string } | undefined
    if (data.length > Number(limit)) {
      const nextItem = data.pop()
      if (nextItem != null) {
        nextCursor = { id: nextItem.id }
      }
    }

    const stories = data.map((story) => {
      return {
        id: story.id,
        title: story.title,
        slug: story.slug,
        thumbnail: story.thumbnail,
        tage: story.tags,
        user: story.user,
        likes: story._count.likes,
        likedByMe: story.likes?.length > 0,
      }
    })

    return NextResponse.json({
      stories,
      nextCursor,
    })
  } catch (e) {
    console.log(e)
  }
}
