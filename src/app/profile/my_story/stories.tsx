import StoryExcerpt from "@/components/excerpts/story-excerpt"
import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { Tag } from "../../../../types"

async function getMyStories() {
  const session = await auth()
  const userId = session?.user?.id as string

  const stories = await prisma.story.findMany({
    where: {
      userId,
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
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
      updated_at: true,
      created_at: true,
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
      isAuthor: story.userId === userId,
      updated_at: story.updated_at,
      created_at: story.created_at,
    }
  })
}

export default async function Stories() {
  const stories = await getMyStories()
  return stories.length > 0 ? (
    <div className="flex flex-col gap-8 w-full">
      <p className="text-sm text-muted-foreground">
        Manage your stories by making them attractive to readers.
      </p>
      <div className="grid grid-cols-layout-300 gap-16 w-full">
        {stories.map((story) => (
          <StoryExcerpt key={story.id} story={story} />
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-8 w-full">
      <p className="text-sm text-muted-foreground">
        You have no stories created.
      </p>
      <Button
        asChild
        type="submit"
        variant="outline"
        className="self-start px-8 rounded-full"
      >
        <Link href="/ryte">Create new</Link>
      </Button>
    </div>
  )
}
