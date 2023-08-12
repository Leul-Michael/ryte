import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import Link from "next/link"
import { auth } from "@/lib/auth"
import StoryTags from "@/components/story-tags"
import StoriesTimeline from "@/components/stories-timeline"
import { Suspense } from "react"
import ForceRefresh from "@/components/force-refresh"
import prisma from "@/lib/prisma"
import { Skeleton } from "@/components/ui/skeleton"

export const dynamic = "force-dynamic"
// export const runtime = "edge"

async function getFollowingTags() {
  const session = await auth()
  const userId = session?.user?.id as string

  const tags = await prisma.tag.findMany({
    where: {
      followers: {
        some: {
          id: userId,
        },
      },
    },
  })

  return tags
}

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
      <ForceRefresh />
      {session?.user ? <Authed tag={tag} /> : <UnAuthed />}
    </section>
  )
}

async function Authed({ tag }: { tag: string | undefined }) {
  const tags = await getFollowingTags()
  return (
    <div className="w-full h-full flex flex-col flex-1 py-12 gap-8 overflow-hidden">
      <h1 className="font-serif md:text-6xl text-5xl font-semibold leading-[1.1] capitalize text-accent-foreground">
        Explore Stories
      </h1>
      <p className="md:text-xl text-[1.1rem] max-w-[500px] text-muted-foreground">
        Discover topics, thinking, and expertise from writers on any topic.
      </p>
      <Suspense fallback={<Skeleton className="w-full h-[20px] rounded-md" />}>
        <StoryTags tags={tags} search={tag ?? null} />
      </Suspense>
      <StoriesTimeline tag={tag ?? ""} />
    </div>
  )
}

function UnAuthed() {
  return (
    <>
      <div className="flex flex-col w-full gap-8">
        <h1 className="font-serif md:text-6xl text-5xl font-semibold leading-[1.1] capitalize text-accent-foreground">
          <span className="uppercase">Ryte</span> your <i>thoughts!</i>
        </h1>
        <p className="md:text-2xl text-xl max-w-[500px]">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <Button
          variant="link"
          asChild
          className="bg-accent-green self-start min-w-[150px] md:min-w-[250px] py-6 hover:bg-accent-green rounded-full focus:bg-accent-green text-black"
        >
          <Link href="/auth/login">
            <BookOpen className="mr-2 h-4 w-4" /> Read on Ryte
          </Link>
        </Button>
      </div>
      <div className="flex flex-col w-full"></div>
    </>
  )
}
