import AvatarIcon from "@/components/avatar"
import prisma from "@/lib/prisma"
import { format } from "date-fns"
import Image from "next/image"
import parse, { Element } from "html-react-parser"
import { StoryDescription, StoryImage } from "../../../../types"
import { auth } from "@/lib/auth"
import StoryStats from "./story-stats"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card"
import AuthorCard from "./author-card"
import { Metadata } from "next"
import AuthorStories from "./author-stories"
import StorySkeleton from "@/components/skeletons/story-skeleton"
import Recommended from "./recommended"
import Author from "./author"

async function getStoryBySlug(slug: string) {
  const session = await auth()
  const userId = session?.user?.id as string

  let savedByMe = null

  if (userId) {
    savedByMe = await prisma.user.findUnique({
      where: {
        id: userId,
        saved: {
          hasSome: [slug],
        },
      },
    })
  }

  const story = await prisma.story.findFirst({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      tags: true,
      thumbnail: true,
      content: true,
      min_read: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          bio: true,
          _count: {
            select: {
              followers: true,
              follows: true,
            },
          },
          followers:
            userId == null
              ? false
              : {
                  where: {
                    id: userId,
                  },
                },
          created_at: true,
        },
      },
      created_at: true,
      updated_at: true,
      _count: {
        select: { likes: true, comments: true },
      },
      likes:
        userId == null
          ? false
          : {
              where: {
                userId,
              },
            },
    },
  })

  if (!story) return null

  return {
    session: session?.user
      ? {
          id: session.user.id,
          name: session.user.name,
        }
      : null,
    id: story?.id,
    title: story?.title,
    slug: story?.slug,
    description: story?.description,
    thumbnail: story?.thumbnail,
    tags: story.tags,
    content: story?.content,
    min_read: story?.min_read,
    user: story?.user,
    likes: story?._count.likes,
    comments: story?._count.comments,
    likedByMe: story?.likes?.length > 0,
    savedByMe: savedByMe != null ? true : false,
    created_at: story?.created_at,
    updated_at: story?.updated_at,
    isAuthor: userId === story.user.id,
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const story = await getStoryBySlug(params.slug)
  if (!story) {
    return
  }

  const {
    title,
    created_at: publishedTime,
    description,
    thumbnail,
    slug,
    user,
  } = story
  const ogImage = `${process.env.NEXTAUTH_URL}/og?title=${title}&author=${user.name}`

  return {
    title,
    description: (description as any).text,
    openGraph: {
      title,
      description: (description as any).text,
      type: "article",
      publishedTime: new Date(publishedTime).toISOString(),
      authors: user.name,
      url: `${process.env.NEXTAUTH_URL}story/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: (description as any).text,
      images: [ogImage],
    },
  }
}

export const dynamic = "force-dynamic"

export default async function Story({ params }: { params: { slug: string } }) {
  const story = await getStoryBySlug(params.slug)

  if (!story) {
    return (
      <section className="flex h-full flex-col max-w-screen-md mx-auto pt-12 pb-20 min-h-[90vh] gap-4 w-full">
        <h1 className="text-5xl font-serif font-semibold leading-none">
          Story not found!
        </h1>
        <p className="text-[1.35rem] max-w-[90%] text-muted-foreground">
          Discover other stories by exploring homepage.
        </p>
        <Button
          asChild
          type="submit"
          variant="outline"
          className="self-start px-8 rounded-full"
        >
          <Link href="/">Explore</Link>
        </Button>
      </section>
    )
  }

  return (
    <section className="flex h-full flex-col max-w-screen-md mx-auto pt-12 pb-20 min-h-[90vh] gap-8 w-full">
      <div className="flex items-end gap-4 w-full">
        <HoverCard>
          <HoverCardTrigger>
            <AvatarIcon
              className="md:h-[2.85rem] md:w-[2.85rem] h-10 w-10"
              name={story?.user.name ?? null}
              image={story?.user.image ?? null}
            />
          </HoverCardTrigger>
          <AuthorCard
            user={story.user}
            session={story.session}
            isAuthor={story.isAuthor}
            slug={story.slug}
          />
        </HoverCard>
        <div className="flex flex-col">
          <span className="md:text-xl font-serif">{story?.user.name}</span>
          <span className="md:text-sm text-xs text-muted-foreground">
            {story?.created_at
              ? format(new Date(story?.created_at), "MMM dd,yyyy")
              : null}
          </span>
        </div>
        <span className="ml-auto md:text-sm text-xs text-muted-foreground">
          {story?.min_read} min read
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-serif font-semibold leading-[1.1]">
        {story?.title}
      </h1>
      {!(story?.description as unknown as StoryDescription)?.in_content ? (
        <p className="text-[1.35rem] max-w-[90%] text-muted-foreground">
          {(story?.description as unknown as StoryDescription)?.text}
        </p>
      ) : null}
      <Suspense
        fallback={<Skeleton className="w-full h-full rounded-none py-8 px-2" />}
      >
        <StoryStats
          slug={story.slug}
          likedByMe={story.likedByMe}
          savedByMe={story.savedByMe}
          likes={story.likes}
          comments={story.comments}
          session={story.session}
        />
      </Suspense>
      {story?.thumbnail &&
      (story?.thumbnail as unknown as StoryImage)?.src &&
      !(story?.thumbnail as unknown as StoryImage)?.in_content ? (
        <div className="relative flex max-h-[650px] h-[40vh] w-full overflow-hidden rounded-[4px] sm:h-[50vh] md:h-[60vh] lg:h-[450px]">
          <Image
            alt={(story?.thumbnail as unknown as StoryImage)?.alt}
            src={(story?.thumbnail as unknown as StoryImage)?.src}
            sizes="100vw"
            fill
            style={{
              maxWidth: "100%",
            }}
            className="bg-gray-800/40 object-cover"
          />
        </div>
      ) : null}
      <div className="flex flex-col gap-2">
        {story?.content ? (
          <div className="tiptap output">
            {parse(story.content, {
              replace: (domNode) => {
                if (
                  domNode instanceof Element &&
                  domNode.name &&
                  domNode.name === "img"
                ) {
                  return (
                    <div className="relative flex my-4 max-h-[650px] min-h-[40vh] h-full w-full overflow-hidden rounded-[4px] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[450px]">
                      <Image
                        src={domNode.attribs.src}
                        alt={domNode.attribs.alt}
                        fill
                        sizes="100vw"
                        className="bg-border/40"
                      />
                    </div>
                  )
                }
              },
            })}
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        {story.tags.map((t) => (
          <p
            className="py-1 px-3 w-fit bg-muted text-sm text-muted-foreground rounded-full"
            key={t.id}
          >
            {t.title}
          </p>
        ))}
      </div>
      <Suspense
        fallback={<Skeleton className="w-full h-full rounded-none py-8 px-2" />}
      >
        <StoryStats
          slug={story.slug}
          likedByMe={story.likedByMe}
          savedByMe={story.savedByMe}
          likes={story.likes}
          comments={story.comments}
          session={story.session}
        />
      </Suspense>
      <Author
        user={story.user}
        session={story.session}
        isAuthor={story.isAuthor}
        slug={story.slug}
      />
      <Suspense fallback={<StorySkeleton />}>
        <AuthorStories storyId={story.id} authorId={story.user.id} />
      </Suspense>
      <Suspense fallback={<StorySkeleton />}>
        <Recommended
          storyId={story.id}
          authorId={story.user.id}
          tags={story.tags.map((t) => t.id)}
        />
      </Suspense>
    </section>
  )
}
