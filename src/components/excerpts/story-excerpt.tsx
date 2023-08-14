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
      <article ref={ref} className={cn("flex flex-col gap-4", className ?? "")}>
        <div
          style={{
            backgroundImage: `url(${story?.thumbnail?.src})`,
          }}
          className={cn(
            "flex flex-col w-full rounded-[4px]",
            story?.thumbnail?.src
              ? `h-[175px] bg-cover bg-no-repeat justify-end md:p-6 p-4 story`
              : "h-auto"
          )}
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              href={`/user/${story.user.username}`}
              className="group flex items-center gap-4"
            >
              <AvatarIcon
                className="md:w-9 md:h-9 w-6 h-6"
                name={story.user.name}
                image={story.user.image}
              />
              <div className="flex gap-2 items-baseline">
                <span
                  className={cn(
                    "font-semibold md:text-xl font-serif group-hover:underline group-hover:underline-offset-4 decoration-1 decoration-primary/70",
                    story?.thumbnail?.src ? `text-white` : "text-primary"
                  )}
                >
                  {story.user.name}
                </span>
                {story.created_at ? (
                  <span className="text-xs md:text-sm">
                    <Timeago
                      timestamp={story.created_at}
                      noprefix
                      className={cn(
                        story?.thumbnail?.src
                          ? `text-white/80`
                          : "text-muted-foreground"
                      )}
                    />
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
        </div>
        <Link
          href={`/story/${story.slug}`}
          className="group flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-left">
                  <h1 className="group-hover:underline group-hover:underline-offset-4 decoration-1 decoration-primary/70 md:text-3xl text-2xl font-serif font-semibold leading-none">
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
              {(story.description as StoryDescription)?.text?.length > 200
                ? story.description?.text.slice(0, 200) + "..."
                : story.description?.text}
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="py-1 px-2 w-fit bg-muted text-xs text-muted-foreground rounded-sm">
              {story.tags[0].title + ` + ${story.tags.length - 1}`}
            </span>
            <p className="p-1 w-fit text-xs text-muted-foreground rounded-sm">
              {story.min_read} min read
            </p>
          </div>
        </Link>
      </article>
    )
  }
)

StoryExcerpt.displayName = "StoryExcerpt"

export default StoryExcerpt
