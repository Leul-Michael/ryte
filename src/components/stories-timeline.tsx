import prisma from "@/lib/prisma"
import StoryExcerpt from "./excerpts/story-excerpt"

async function getStories(tag?: string) {
  const stories = await prisma.story.findMany({
    where: {
      tags: {
        some: {
          title: { contains: tag, mode: "insensitive" },
        },
      },
    },
    include: {
      user: true,
      tags: true,
    },
  })

  return stories
}

interface StoriesTimelineProps {
  tag: string
}

export const dynamic = "force-dynamic"

const StoriesTimeline = async ({ tag }: StoriesTimelineProps) => {
  const stories = await getStories(tag)

  return (
    <div className="w-full grid grid-cols-layout-450 gap-8 h-full">
      {stories.map((story) => (
        <StoryExcerpt key={story.id} story={story} />
      ))}
    </div>
  )
}

export default StoriesTimeline
