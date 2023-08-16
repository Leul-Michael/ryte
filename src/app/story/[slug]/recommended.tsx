import StoryExcerpt from "@/components/excerpts/story-excerpt"
import prisma from "@/lib/prisma"

async function recommendedStories(
  storyId: string,
  authorId: string,
  tags: string[]
) {
  const storyIds = await prisma.story.findMany({
    where: {
      NOT: {
        user: {
          id: authorId,
        },
        id: storyId,
      },
      tags: {
        some: {
          id: {
            in: [...tags],
          },
        },
      },
    },
    select: { id: true },
  })
  const idArray = storyIds.map((element) => element.id)
  const randomIndex = Math.floor(Math.random() * idArray.length)
  const randomIdFromTable = idArray[randomIndex]

  const story = await prisma.story.findFirst({
    where: {
      id: randomIdFromTable,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      min_read: true,
      thumbnail: true,
      tags: true,
      userId: true,
      user: true,
      updated_at: true,
      created_at: true,
    },
  })

  if (!story) return null

  return {
    id: story.id,
    slug: story.slug,
    title: story.title,
    description: story.description,
    min_read: story.min_read,
    thumbnail: story.thumbnail,
    tags: story.tags,
    userId: story.userId,
    user: story.user,
    updated_at: story.updated_at,
    created_at: story.created_at,
  }
}

type recommendedProps = {
  storyId: string
  authorId: string
  tags: string[]
}

export default async function Recommended({
  storyId,
  authorId,
  tags,
}: recommendedProps) {
  const story = await recommendedStories(storyId, authorId, tags)
  return story ? (
    <div className="flex flex-col gap-8 my-8">
      <h1 className="text-2xl md:text-3xl font-serif font-semibold leading-[1.1]">
        Recommended
      </h1>
      <div className="flex flex-col gap-16">
        <StoryExcerpt story={story} />
      </div>
    </div>
  ) : null
}
