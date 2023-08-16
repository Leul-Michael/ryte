import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Form from "./form"
import prisma from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { StoryDescription, StoryImage } from "../../../../../types"

async function getStoryBySlug(slug: string) {
  const session = await auth()
  const userId = session?.user?.id as string

  const story = await prisma.story.findFirst({
    where: {
      slug,
      userId,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      thumbnail: true,
      tags: true,
      content: true,
    },
  })

  if (!story) return null

  return {
    id: story?.id,
    title: story?.title,
    slug: story?.slug,
    description: story?.description as unknown as StoryDescription,
    thumbnail: story?.thumbnail as unknown as StoryImage,
    content: story?.content,
    tags: story.tags,
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const story = await getStoryBySlug(params.slug)

  if (!story) return {}

  return {
    title: "Update | " + story.title,
    description: (story.description as any)?.text,
  }
}

export default async function UpdateStory({
  params,
}: {
  params: { slug: string }
}) {
  const story = await getStoryBySlug(params.slug)

  if (!story) {
    return (
      <section className="flex h-full flex-col max-w-screen-md mx-auto pt-12 pb-20 min-h-[90vh] gap-4 w-full">
        <h1 className="text-5xl font-serif font-semibold leading-none">
          Story not found!
        </h1>
        <p className="text-[1.35rem] max-w-[90%] text-muted-foreground">
          Manage other stories or Create new one to manage.
        </p>
        <Button
          asChild
          type="submit"
          variant="outline"
          className="self-start px-8 rounded-full"
        >
          <Link href="/profile/my_story">My story</Link>
        </Button>
      </section>
    )
  }

  return (
    <section className="relative flex h-full max-w-[900px] mx-auto flex-col min-h-[90vh] w-full pt-10">
      <Form story={story} />
    </section>
  )
}
