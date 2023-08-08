import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const session = await auth()
  const userId = session.user?.id as string

  const url = new URL(request.url)
  const storyId = url.searchParams.get("storyId") ?? ""

  try {
    const likes = await prisma.like.findMany({
      where: {
        storyId,
      },
    })

    const isLikedByMe = await prisma.like.findUnique({
      where: {
        userId_storyId: {
          userId,
          storyId,
        },
      },
    })

    return NextResponse.json({
      likes,
      likedByMe: isLikedByMe == null ? false : true,
    })
  } catch (e) {
    console.log(e)
  }
}
