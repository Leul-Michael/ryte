import StoryExcerpt from "@/components/excerpts/story-excerpt"
import prisma from "@/lib/prisma"

async function storiesByAuthor(storyId: string, authorId: string) {
  const stories = await prisma.story.findMany({
    where: {
      user: {
        id: authorId,
      },
      NOT: {
        id: storyId,
      },
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
    take: 2,
    orderBy: {
      created_at: "desc",
    },
  })

  return stories.map((story) => {
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
  })
}

type AuthorStoriesProps = {
  storyId: string
  authorId: string
}

export default async function AuthorStories({
  storyId,
  authorId,
}: AuthorStoriesProps) {
  const stories = await storiesByAuthor(storyId, authorId)
  return (
    <div className="flex flex-col gap-8 my-8">
      <h1 className="text-2xl md:text-3xl font-serif font-semibold leading-[1.1]">
        By the Author
      </h1>
      <div className="flex flex-col gap-16">
        {stories.map((story) => (
          <StoryExcerpt key={story.id} story={story} />
        ))}
      </div>
    </div>
  )
}
