import Image from "next/image"
import { Story, StoryDescription } from "../../../types"
import AvatarIcon from "../avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { format } from "date-fns"
import Link from "next/link"
import { Ref, forwardRef } from "react"

interface StoryExcerptProps {
  story: Story
}

const StoryExcerpt = forwardRef(
  (props: StoryExcerptProps, ref: Ref<HTMLAnchorElement> | null) => {
    const { story } = props
    const date = new Date(story.created_at)
    return (
      <Link
        ref={ref}
        href={`/story/${story.slug}`}
        className="flex flex-col py-6 md:pr-6 gap-3"
      >
        <div className="flex items-center gap-4">
          <AvatarIcon
            className="md:w-9 md:h-9 w-6 h-6"
            name={story.user.name}
            image={story.user.image}
          />
          <div className="flex gap-2 items-baseline">
            <span className="md:text-xl font-serif">{story.user.name}</span>
            <span className="text-xs md:text-sm text-muted-foreground">
              {format(date, "MMM dd,yyyy")}
            </span>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-start gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-left">
                  <h1 className="md:text-3xl text-2xl font-serif font-semibold leading-none">
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
            <p className="text-[0.95rem] leading-[1.4] text-secondary-foreground/80">
              {(story.description as StoryDescription)?.text?.length > 200
                ? story.description?.text.slice(0, 200) + "..."
                : story.description?.text}
            </p>
          </div>
          {story?.thumbnail?.src ? (
            <Image
              alt={story.thumbnail.alt}
              src={story.thumbnail.src}
              width={150}
              height={100}
              style={{
                maxHeight: "100px",
                height: "auto",
                objectFit: "cover",
              }}
              className="rounded-md mt-2 hidden md:block"
            />
          ) : null}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="py-1 px-2 w-fit bg-muted text-xs text-muted-foreground rounded-sm">
            {story.tags[0].title + ` + ${story.tags.length - 1}`}
          </span>
          <p className="p-1 w-fit text-xs md:text-sm text-muted-foreground rounded-sm">
            {story.min_read} min read
          </p>
        </div>
      </Link>
    )
  }
)

StoryExcerpt.displayName = "StoryExcerpt"

export default StoryExcerpt
