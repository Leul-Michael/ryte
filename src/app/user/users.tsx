import UserExcerpt from "@/components/excerpts/user-excerpt"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

async function getUsers(name?: string) {
  const session = await auth()
  const userId = session?.user?.id as string

  const data = await prisma.user.findMany({
    where: {
      name: { contains: name, mode: "insensitive" },
      role: "BASIC",
      NOT: {
        id: userId,
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      _count: {
        select: { followers: true, stories: true, follows: true },
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

  const users = data.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      followers: user._count.followers,
      follows: user._count.follows,
      stories: user._count.stories,
      followedByMe: user.followers?.length > 0,
    }
  })

  return users
}

export default async function Users({ name }: { name: string }) {
  const users = await getUsers(name)

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-center text-muted-foreground">
        {users?.length} Results
      </p>
      <div className="grid grid-cols-layout-250 gap-8 py-6">
        {users?.map((user) => (
          <UserExcerpt key={user.id} user={user} />
        ))}
      </div>
    </div>
  )
}
