"use client"

import { fetcher } from "@/lib/utils"
import useSWRInfinite from "swr/infinite"
import { Story } from "../../../../types"
import StorySkeleton from "@/components/skeletons/story-skeleton"
import StoryExcerpt from "@/components/excerpts/story-excerpt"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

type UserStoriesProps = {
  userId: string
}

export default function UserStories({ userId }: UserStoriesProps) {
  const { data, isLoading, size, setSize, isValidating } = useSWRInfinite<{
    stories: Story[]
    nextCursor: { id: String } | undefined
  }>((pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData?.stories?.length) return null // reached the end
    if (pageIndex === 0) return `/api/story/${userId}`

    return `/api/story/${userId}?cursor=${previousPageData.nextCursor?.id}`
  }, fetcher)

  return (
    <div className="flex flex-col gap-2 w-full">
      {isLoading
        ? [...Array(2).keys()].map((i) => <StorySkeleton key={i} />)
        : data?.map((v) => {
            return v.stories.length > 0 ? (
              v?.stories?.map((story, i) => (
                <StoryExcerpt key={story.id} story={story} />
              ))
            ) : (
              <p className="text-xs text-muted-foreground">
                Be the first to comment on the story.
              </p>
            )
          })}
      {!isLoading && isValidating ? <StorySkeleton /> : null}
      {data?.find((v, i) => {
        if (data.length - 1 === i) return v.nextCursor
      }) ? (
        <Button
          disabled={isLoading || isValidating}
          variant="outline"
          onClick={() => setSize(size + 1)}
          className="mx-auto group mb-1 rounded-full w-[35px] h-[35px] p-0"
        >
          <Plus size={20} className="opacity-70 group-hover:opacity-100" />
        </Button>
      ) : null}
    </div>
  )
}
