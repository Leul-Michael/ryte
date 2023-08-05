import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const session = await auth()
  const userId = session.user?.id as string

  try {
    const tags = await prisma.tag.findMany({
      where: {
        followers: {
          some: {
            id: userId,
          },
        },
      },
    })

    return NextResponse.json({ tags })
  } catch (e) {
    console.log(e)
  }
}
