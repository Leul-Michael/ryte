import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const session = await auth()
  const userId = session.user?.id as string

  const url = new URL(request.url)
  const storySlug = url.searchParams.get("storySlug") ?? ""

  try {
    const likes = await prisma.like.findMany({
      where: {
        storySlug,
      },
    })

    const isLikedByMe = await prisma.like.findUnique({
      where: {
        userId_storySlug: {
          userId,
          storySlug,
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
