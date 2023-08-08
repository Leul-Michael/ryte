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

async function getStoryBySlug(slug: string) {
  const session = await auth()
  const userId = session?.user?.id as string

  const story = await prisma.story.findFirst({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      thumbnail: true,
      content: true,
      min_read: true,
      user: true,
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
    id: story?.id,
    title: story?.title,
    slug: story?.slug,
    description: story?.description,
    thumbnail: story?.thumbnail,
    content: story?.content,
    min_read: story?.min_read,
    user: story?.user,
    likes: story?._count.likes,
    comments: story?._count.comments,
    likedByMe: story?.likes?.length > 0,
    created_at: story?.created_at,
    updated_at: story?.updated_at,
  }
}

export const dynamic = "force-dynamic"

export default async function Story({ params }: { params: { slug: string } }) {
  const story = await getStoryBySlug(params.slug)

  if (!story) {
    return (
      <section className="flex h-full flex-col max-w-screen-md mx-auto pt-12 pb-20 min-h-[90vh] gap-8 w-full">
        <h1 className="text-5xl font-serif font-semibold text-center leading-none">
          Story not found!
        </h1>
      </section>
    )
  }

  return (
    <section className="flex h-full flex-col max-w-screen-md mx-auto pt-12 pb-20 min-h-[90vh] gap-8 w-full">
      <div className="flex items-end gap-4 w-full">
        <AvatarIcon
          className="h-[2.85rem] w-[2.85rem]"
          name={story?.user.name ?? null}
          image={story?.user.image ?? null}
        />
        <div className="flex flex-col">
          <span className="text-xl font-serif">{story?.user.name}</span>
          <span className="text-sm text-muted-foreground">
            {story?.created_at
              ? format(new Date(story?.created_at), "MMM dd,yyyy")
              : null}
          </span>
        </div>
        <span className="ml-auto text-sm text-muted-foreground">
          {story?.min_read} min read
        </span>
      </div>
      <h1 className="text-5xl font-serif font-semibold leading-none">
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
          id={story.id}
          slug={story.slug}
          likedByMe={story.likedByMe}
          likes={story.likes}
          comments={story.comments}
        />
      </Suspense>
      {story?.thumbnail &&
      (story?.thumbnail as unknown as StoryImage)?.src &&
      !(story?.thumbnail as unknown as StoryImage)?.in_content ? (
        <div className="relative flex max-h-[650px] min-h-[40vh] w-full overflow-hidden rounded-[4px] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[450px]">
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
                    <div className="relative my-4 flex max-h-[650px] min-h-[40vh] h-full w-full overflow-hidden rounded-[4px] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[450px]">
                      <Image
                        src={domNode.attribs.src}
                        alt={domNode.attribs.alt}
                        fill
                        sizes="100vw"
                        style={{
                          maxWidth: "100%",
                        }}
                        className="bg-gray-800/40 object-cover"
                      />
                    </div>
                  )
                }
              },
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
