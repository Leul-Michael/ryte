// import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // const session = await auth()
  // const userId = session.user?.id as string

  const url = new URL(request.url)
  const storySlug = url.searchParams.get("slug") ?? ""
  const cursor = url.searchParams.get("cursor") ?? ""
  const limit = url.searchParams.get("limit") ?? 10

  try {
    const comments = await prisma.comment.findMany({
      where: {
        storySlug,
        // NOT: {
        //   userId,
        // },
      },
      include: {
        user: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: Number(limit) + 1,
      cursor: cursor ? { id: cursor } : undefined,
    })

    // const myComments = await prisma.comment.findMany({
    //   where: {
    //     userId,
    //     storySlug,
    //   },
    //   include: {
    //     user: true,
    //   },
    //   orderBy: {
    //     created_at: "desc",
    //   },
    // })

    let nextCursor: { id: string } | undefined
    if (comments.length > Number(limit)) {
      const nextItem = comments.pop()
      if (nextItem != null) {
        nextCursor = { id: nextItem.id }
      }
    }

    return NextResponse.json({
      comments,
      nextCursor,
    })
  } catch (e) {
    console.log(e)
  }
}
