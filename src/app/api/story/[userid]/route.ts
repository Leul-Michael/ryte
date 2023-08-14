import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { userid: string } }
) {
  const url = new URL(request.url)
  const cursor = url.searchParams.get("cursor") ?? ""
  const limit = url.searchParams.get("limit") ?? 10

  try {
    const stories = await prisma.story.findMany({
      where: {
        userId: params.userid,
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
