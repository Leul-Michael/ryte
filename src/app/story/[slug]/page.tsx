import AvatarIcon from "@/components/avatar"
import { FistIcon } from "@/components/buttons"
import { ShareDropdown } from "@/components/share-dropdown"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { BookmarkPlus, MessageCircle } from "lucide-react"
import { ReactNode } from "react"
import prisma from "@/lib/prisma"
import { format } from "date-fns"
import Image from "next/image"
import parse, { Element } from "html-react-parser"

async function getStoryBySlug(slug: string) {
  const story = await prisma.story.findFirst({
    where: {
      slug,
    },
    include: {
      tags: true,
      user: true,
    },
  })
  return story
}

export const dynamic = "force-dynamic"

export default async function Story({ params }: { params: { slug: string } }) {
  const story = await getStoryBySlug(params.slug)
  return (
    <section className="flex h-full flex-col max-w-screen-md mx-auto pt-12 pb-20 min-h-[90vh] gap-8 w-full">
      <div className="flex items-end gap-4">
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
        <span className="text-sm text-muted-foreground">
          {story?.min_read} min read
        </span>
      </div>
      <h1 className="text-5xl font-serif font-semibold leading-none">
        {story?.title}
      </h1>
      <p className="text-[1.35rem] max-w-[90%] text-muted-foreground">
        {story?.description}
      </p>
      <div className="flex flex-col border-y border-border py-5 px-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <TooltipWrapper title="fist bumps">
                <FistIcon />
              </TooltipWrapper>
              5.2k
            </span>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <TooltipWrapper title="comments">
                <MessageCircle size={20} />
              </TooltipWrapper>
              5.2k
            </span>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <TooltipWrapper title="save story">
                <BookmarkPlus size={20} />
              </TooltipWrapper>
            </span>
          </div>
          <span className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShareDropdown />
          </span>
        </div>
      </div>
      {story?.thumbnail && (story?.thumbnail as any)?.src ? (
        <div className="relative flex max-h-[650px] min-h-[40vh] w-full overflow-hidden rounded-[4px] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[450px]">
          <Image
            alt={(story?.thumbnail as any)?.alt}
            src={(story?.thumbnail as any)?.src}
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
                    <div className="relative my-4 flex max-h-[650px] min-h-[40vh] w-full overflow-hidden rounded-[4px] sm:min-h-[50vh] md:min-h-[60vh] lg:min-h-[450px]">
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

const TooltipWrapper = ({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="text-left">{children}</TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
