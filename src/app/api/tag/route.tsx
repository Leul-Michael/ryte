import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const session = await auth()
  const userId = session.user?.id as string

  const url = new URL(request.url)
  const title = url.searchParams.get("q") ?? ""

  try {
    const tags = await prisma.tag.findMany({
      where: {
        title: { contains: title, mode: "insensitive" },
      },
      select: {
        id: true,
        title: true,
        ct: true,
        created_at: true,
        updated_at: true,
        _count: {
          select: { followers: true, stories: true },
        },
        followers:
          userId == null
            ? false
            : {
                where: {
                  id: userId,
                },
              },
      },
      orderBy: {
        created_at: "desc",
      },
    })

    const response = tags.map((tag) => {
      return {
        id: tag.id,
        title: tag.title,
        created_at: tag.created_at,
        updated_at: tag.updated_at,
        followers: tag._count.followers,
        stories: tag._count.stories,
        followedByMe: tag.followers?.length > 0,
      }
    })

    return NextResponse.json({ tags: response })
  } catch (e) {
    console.log(e)
  }
}
