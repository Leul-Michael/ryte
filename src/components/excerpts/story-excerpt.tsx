import { Story, StoryDescription } from "../../../types"
import AvatarIcon from "../avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import Link from "next/link"
import { Ref, forwardRef } from "react"
import Timeago from "../timeago"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface StoryExcerptProps {
  story: Omit<Story, "content"> & {
    isAuthor?: boolean
  }
  className?: string
}

const StoryExcerpt = forwardRef(
  (props: StoryExcerptProps, ref: Ref<HTMLDivElement> | null) => {
    const { story, className } = props

    return (
      <article ref={ref} className={cn("flex flex-col gap-2", className ?? "")}>
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/user/${story.user.username}`}
            className="group w-full flex items-center gap-4"
          >
            <AvatarIcon
              className="w-6 h-6"
              name={story.user.name}
              image={story.user.image}
            />
            <div className="flex gap-2 items-baseline">
              <span className="font-semibold md:text-base text-sm font-serif group-hover:underline group-hover:underline-offset-4 decoration-1 decoration-primary/70">
                {story.user.name}
              </span>
              {story.created_at ? (
                <span className="text-xs md:text-sm">
                  <Timeago timestamp={story.created_at} noprefix />
                </span>
              ) : null}
            </div>
          </Link>
          {story?.isAuthor ? (
            <div className="flex gap-4 items-center">
              <Button
                asChild
                variant="outline"
                className="rounded-full  py-2 h-auto text-xs"
              >
                <Link href={`/story/${story.slug}/update`}>Update</Link>
              </Button>
            </div>
          ) : null}
        </div>
        <Link
          href={`/story/${story.slug}`}
          className="group  flex gap-4 items-start"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-left">
                    <h1 className="group-hover:underline group-hover:underline-offset-4 decoration-1 decoration-primary/70 md:text-2xl text-xl font-serif font-semibold leading-none">
                      {story.title.length > 30
                        ? story.title.slice(0, 30) + "..."
                        : story.title}
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{story.title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <p className="text-[0.95rem] leading-[1.4] ">
                {(story.description as StoryDescription)?.text?.length > 120
                  ? story.description?.text.slice(0, 120) + "..."
                  : story.description?.text}
              </p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="py-1 px-3 w-fit bg-muted text-[0.65rem] text-muted-foreground rounded-full">
                {story.tags[Math.floor(Math.random() * story.tags.length) ?? 0]
                  .title + ` + ${story.tags.length - 1}`}
              </span>
              <p className="p-1 w-fit text-xs text-muted-foreground rounded-sm">
                {story.min_read} min read
              </p>
            </div>
          </div>
          {story?.thumbnail?.src ? (
            <div className="relative hidden md:grid w-full max-w-[150px] h-full">
              <Image
                alt={story?.thumbnail?.alt}
                src={story?.thumbnail?.src}
                fill
                sizes="(max-width: 0px) 100vw"
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
                className="rounded-sm object-cover mt-2 w-full"
              />
            </div>
          ) : null}
        </Link>
      </article>
    )
  }
)

StoryExcerpt.displayName = "StoryExcerpt"

export default StoryExcerpt
