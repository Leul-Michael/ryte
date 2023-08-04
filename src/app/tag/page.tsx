import { Tag } from "../../../types"
import prisma from "@/lib/prisma"
import TagSkeleton from "@/components/skeletons/tag-skeleton"
import TagExcerpt from "@/components/excerpts/tag-excerpt"
import { auth } from "@/lib/auth"
import { Suspense } from "react"
import Search from "./search"

async function getTags(title?: string) {
  const session = await auth()
  const userId = session.user?.id as string

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

export const dynamic = "force-dynamic"

export default async function Tag({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const title = typeof searchParams.q === "string" ? searchParams.q : undefined
  const tags = await getTags(title)

  return (
    <section className="relative flex h-full flex-col min-h-[90vh] w-full py-10">
      <div className="w-full h-full flex flex-col flex-1 py-5 gap-8">
        <h1 className="font-serif text-center text-6xl font-semibold capitalize text-accent-foreground">
          Tags
        </h1>
        <p className="text-center text-xl max-w-[500px] mx-auto w-full text-muted-foreground">
          Discover topics, thinking, and expertise from writers on any topic.
        </p>
        <Search search={title} />
        <Suspense
          fallback={
            <div className="grid grid-cols-layout-250 gap-8 py-6">
              {[...Array(8).keys()].map((i) => (
                <TagSkeleton key={i} />
              ))}
            </div>
          }
        >
          <div className="flex flex-col gap-1">
            <p className="text-xs text-center text-muted-foreground">
              {tags?.length} Results
            </p>
            <div className="grid grid-cols-layout-250 gap-8 py-6">
              {tags?.map((tag) => <TagExcerpt key={tag.id} tag={tag} />)}
            </div>
          </div>
        </Suspense>
      </div>
    </section>
  )
}
