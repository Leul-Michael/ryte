import TagExcerpt from "@/components/excerpts/tag-excerpt"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

async function getTags(title?: string) {
  const session = await auth()
  const userId = session?.user?.id as string

  const data = await prisma.tag.findMany({
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

  const tags = data.map((tag) => {
    return {
      id: tag.id,
      title: tag.title,
      ct: tag.ct,
      created_at: tag.created_at,
      updated_at: tag.updated_at,
      followers: tag._count.followers,
      stories: tag._count.stories,
      followedByMe: tag.followers?.length > 0,
    }
  })

  return tags
}

export default async function Tags({ title }: { title: string }) {
  const tags = await getTags(title)

  return (
    <div className="flex flex-col gap-1">
      <p className="text-xs text-center text-muted-foreground">
        {tags?.length} Results
      </p>
      <div className="grid grid-cols-layout-250 gap-8 py-6">
        {tags?.map((tag) => (
          <TagExcerpt key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  )
}
