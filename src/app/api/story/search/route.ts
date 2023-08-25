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

  let stories = []

  try {
    stories = await prisma.story.findMany({
      where: {
        title: { contains: title, mode: "insensitive" },
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
