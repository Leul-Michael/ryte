import Image from "next/image"
import { Story } from "../../../types"
import AvatarIcon from "../avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

interface StoryExcerptProps {
  story: Story
}

const StoryExcerpt = ({ story }: StoryExcerptProps) => {
  return (
    <div className="flex flex-col py-6 pr-6 gap-3">
      <div className="flex items-center gap-4">
        <AvatarIcon name={story.user.image} image={story.user.image} />
        <div className="flex gap-2 items-baseline">
          <span className="text-xl font-serif">Leul Michael</span>
          <span className="text-sm text-muted-foreground">Nov 13, 2023</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-start gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-left">
                <h1 className="text-3xl font-serif font-semibold">
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

          <p className="text-[0.95rem] leading-[1.4] text-secondary-foreground">
            Session is stored and used to communicate clients and servers for a
            certain amount of time. Today, we will talk about how to implement
            session in Next.js application. We will create a simple application
            to
          </p>
        </div>
        <Image
          alt=""
          src="/google.png"
          width={100}
          height={100}
          className="rounded-md p-2 object-cover"
        />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="py-1 px-2 w-fit bg-muted text-xs text-muted-foreground rounded-sm">
          {story.tags[0].title}
        </span>
        <p className="p-1 w-fit text-sm text-muted-foreground rounded-sm">
          4 min read
        </p>
      </div>
    </div>
  )
}

export default StoryExcerpt
