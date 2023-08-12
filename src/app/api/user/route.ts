// import { auth } from "@/lib/auth"
// import prisma from "@/lib/prisma"
// import { NextResponse } from "next/server"

// export async function GET(request: Request) {
//   const session = await auth()
//   const userId = session?.user?.id as string

//   try {
//     const tags = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//       select: {
//         id: true,
//         name: true,
//         email: true,
//         // created_at: true,
//         _count: {
//           select: { followers: true, follows: true },
//         },
//         followers:
//           userId == null
//             ? false
//             : {
//                 where: {
//                   id: userId,
//                 },
//               },
//       },
//       orderBy: {
//         created_at: "desc",
//       },
//     })

//     const response = tags.map((tag) => {
//       return {
//         id: tag.id,
//         title: tag.title,
//         created_at: tag.created_at,
//         updated_at: tag.updated_at,
//         followers: tag._count.followers,
//         stories: tag._count.stories,
//         followedByMe: tag.followers?.length > 0,
//       }
//     })

//     return NextResponse.json({ tags: response })
//   } catch (e) {
//     console.log(e)
//   }
// }
