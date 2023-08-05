"use client"

import { Story } from "../../types"
import StoryExcerpt from "./excerpts/story-excerpt"

interface StoriesTimelineProps {
  stories: Story[]
}

const StoriesTimeline = ({ stories }: StoriesTimelineProps) => {
  return (
    <div className="w-full grid grid-cols-layout-450 gap-8 h-full">
      {stories.map((story) => (
        <StoryExcerpt key={story.id} story={story} />
      ))}
    </div>
  )
}

export default StoriesTimeline
