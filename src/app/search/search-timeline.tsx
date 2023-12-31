"use client"

import useLastPostRef from "@/hooks/useLastpostRef"
import { fetcher } from "@/lib/utils"
import { useMemo } from "react"
import useSWRInfinite from "swr/infinite"
import SearchStoryExcerpt from "../../components/excerpts/search-story-excerpt"
import { Story } from "../../../types"
import SearchStorySkeleton from "../../components/skeletons/search-story-skeleton"

type SearchTimelineProps = {
  title: string
  sort?: string
}

const SearchTimeline = ({ title, sort = "popular" }: SearchTimelineProps) => {
  const { data, isLoading, mutate, size, setSize, isValidating } =
    useSWRInfinite<{
      stories: (Story & {
        likes: number
        likedByMe: boolean
        savedByMe: boolean
        created_at: Date
      })[]
      nextCursor: { id: String } | undefined
    }>((pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData?.stories?.length) return null // reached the end
      if (pageIndex === 0)
        return `/api/story/search?title=${title}&sort=${sort}`

      return `/api/story/search?title=${title}&sort=${sort}&cursor=${previousPageData.nextCursor?.id}`
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
      <div className="grid grid-cols-layout-300 gap-8">
        {[...Array(3).keys()].map((i) => (
          <SearchStorySkeleton key={i} />
        ))}
      </div>
    )
  } else if (!data || data[0]?.stories?.length <= 0) {
    content = (
      <div className="flex flex-col gap-8">
        <p className="text-sm max-w-[500px] w-full text-muted-foreground">
          No stories found, start following users and read their stories.
        </p>
      </div>
    )
  } else {
    content = (
      <>
        <div className="w-full grid grid-cols-layout-300 gap-8 h-full">
          {data.map((v) =>
            v.stories.map((story, i) => {
              return (
                <SearchStoryExcerpt
                  ref={i === v.stories.length - 1 ? lastPostRef : null}
                  key={story.id}
                  story={story}
                />
              )
            })
          )}
          {!isLoading && isValidating
            ? [
                ...Array(
                  data[0]?.stories?.length % 3 === 0
                    ? 3
                    : data[0]?.stories?.length % 2 === 0
                    ? 2
                    : 1
                ).keys(),
              ].map((i) => <SearchStorySkeleton key={i} />)
            : null}
        </div>
      </>
    )
  }

  return content
}

export default SearchTimeline
