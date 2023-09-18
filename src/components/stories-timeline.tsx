"use client"

import { Button } from "./ui/button"
import Link from "next/link"
import { Story } from "../../types"
import { fetcher } from "@/lib/utils"
import useSWRInfinite from "swr/infinite"
import StorySkeleton from "./skeletons/story-skeleton"
import useLastPostRef from "@/hooks/useLastpostRef"
import { useMemo } from "react"
import StoryExcerpt from "./excerpts/story-excerpt"

interface StoriesTimelineProps {
  tag: string
  userId?: string
}

const StoriesTimeline = ({ tag, userId }: StoriesTimelineProps) => {
  const { data, isLoading, mutate, size, setSize, isValidating } =
    useSWRInfinite<{
      stories: Story[]
      nextCursor: { id: String } | undefined
    }>((pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData?.stories?.length) return null // reached the end
      if (pageIndex === 0) return `/api/story?tag=${tag}`

      return `/api/story?tag=${tag}&cursor=${previousPageData.nextCursor?.id}`
    }, fetcher)

  const hasNextPage = useMemo(() => {
    const nextCursor = data?.find((v, i) => {
      if (data.length - 1 === i) return v.nextCursor
    })
    if (nextCursor) return true
    return false
  }, [data])

  const lastPostRef = useLastPostRef(
    isLoading || isValidating,
    () => setSize(size + 1),
    hasNextPage
  )

  let content

  if (isLoading) {
    content = (
      <div className="grid grid-cols-layout-250 sm:grid-cols-layout-300 md:grid-cols-layout-450 gap-x-16 gap-y-20">
        {[...Array(4).keys()].map((i) => (
          <StorySkeleton key={i} />
        ))}
      </div>
    )
  } else if (!data || data[0]?.stories?.length <= 0) {
    content = (
      <div className="flex flex-col gap-8">
        {!userId ? (
          <p className="text-sm max-w-[500px] w-full text-muted-foreground">
            Create account and start following some tags to find stories in your
            feed
          </p>
        ) : !tag ? (
          <p className="text-sm max-w-[500px] w-full text-muted-foreground">
            Start following some tags to find stories in your feed
          </p>
        ) : tag === "following" ? (
          <p className="text-sm max-w-[500px] w-full text-muted-foreground">
            No stories found, start following users and read their stories.
          </p>
        ) : (
          <p className="text-sm max-w-[500px] w-full text-muted-foreground">
            No stories found under this tag, checkout other tags.
          </p>
        )}

        <Button
          variant="outline"
          asChild
          className="min-w-[150px] self-start rounded-full"
        >
          {!userId ? (
            <Link href="/auth/login">Sign up</Link>
          ) : (
            <Link href={tag === "following" ? "/user" : "/tag"}>
              Find {tag === "following" ? "Users" : "Tags"}
            </Link>
          )}
        </Button>
      </div>
    )
  } else {
    content = (
      <div className="w-full grid grid-cols-layout-250 sm:grid-cols-layout-300 lg:grid-cols-layout-450 gap-20 h-full">
        {data.map((v) =>
          v.stories.map((story, i) => {
            return (
              <StoryExcerpt
                ref={i === v.stories.length - 1 ? lastPostRef : null}
                key={story.id}
                story={story}
              />
            )
          })
        )}
        {!isLoading && isValidating
          ? [...Array(data[0]?.stories?.length % 2 === 0 ? 2 : 1).keys()].map(
              (i) => <StorySkeleton key={i} />
            )
          : null}
      </div>
    )
  }

  return content
}

export default StoriesTimeline
