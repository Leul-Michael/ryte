import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const session = await auth()
  const userId = session.user?.id as string

  const url = new URL(request.url)
  const storyId = url.searchParams.get("slug") ?? ""

  try {
    const comments = await prisma.comment.findMany({
      where: {
        storyId,
        NOT: {
          userId,
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        created_at: "desc",
      },
    })

    const myComments = await prisma.comment.findMany({
      where: {
        userId,
        storyId,
      },
      include: {
        user: true,
      },
      orderBy: {
        created_at: "desc",
      },
    })

    return NextResponse.json({
      comments,
      myComments,
    })
  } catch (e) {
    console.log(e)
  }
}
