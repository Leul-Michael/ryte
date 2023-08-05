import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import Link from "next/link"
import { auth } from "@/lib/auth"
import StoryTags from "@/components/story-tags"
import prisma from "@/lib/prisma"
import StoriesTimeline from "@/components/stories-timeline"
import { Suspense } from "react"
import StorySkeleton from "@/components/skeletons/story-skeleton"

// async function getMyTags() {
//   const session = await auth()
//   const userId = session.user?.id as string

// const tags = await prisma.tag.findMany({
//   where: {
//     followers: {
//       some: {
//         id: userId,
//       },
//     },
//   },
// })

//   return tags
// }

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

export const dynamic = "force-dynamic"
// export const runtime = "edge"

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const tag =
    typeof searchParams.tag === "string" ? searchParams.tag : undefined
  const session = await auth()

  return (
    <section className="flex h-full flex-col min-h-[90vh] w-full justify-center">
      {session?.user ? <Authed tag={tag} /> : <UnAuthed />}
    </section>
  )
}

async function Authed({ tag }: { tag: string | undefined }) {
  const stories = await getStories(tag)
  return (
    <div className="w-full h-full flex flex-col flex-1 py-12 gap-8">
      <h1 className="font-serif text-6xl font-semibold capitalize text-accent-foreground">
        Explore Stories
      </h1>
      <p className="text-xl max-w-[500px] text-muted-foreground">
        Discover topics, thinking, and expertise from writers on any topic.
      </p>
      <StoryTags search={tag ?? null} />
      <Suspense
        fallback={
          <div className="grid grid-cols-layout-450 gap-4">
            {[...Array(8).keys()].map((i) => (
              <StorySkeleton key={i} />
            ))}
          </div>
        }
      >
        <StoriesTimeline stories={stories} />
      </Suspense>
    </div>
  )
}

function UnAuthed() {
  return (
    <>
      <div className="flex flex-col w-full gap-8">
        <h1 className="font-serif text-6xl font-semibold capitalize text-accent-foreground">
          <span className="uppercase">Ryte</span> your <i>thoughts!</i>
        </h1>
        <p className="text-2xl max-w-[500px]">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <Button
          variant="link"
          asChild
          className="bg-accent-green self-start min-w-[250px] py-6 hover:bg-accent-green rounded-full focus:bg-accent-green text-black"
        >
          <Link href="/auth/register">
            <BookOpen className="mr-2 h-4 w-4" /> Read on Ryte
          </Link>
        </Button>
      </div>
      <div className="flex flex-col w-full"></div>
    </>
  )
}
