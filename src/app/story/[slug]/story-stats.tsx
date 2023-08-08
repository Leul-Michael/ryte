"use client"

import { toggleLikeStory } from "@/app/actions"
import { FistIcon } from "@/components/buttons"
import { ShareDropdown } from "@/components/share-dropdown"
import { Sheet, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { BookmarkPlus, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { ReactNode, useTransition } from "react"
import Comments from "./comments"

interface StoryStatsProps {
  id: string
  slug: string
  likes: number
  comments: number
  likedByMe: boolean
}

const StoryStats = ({
  id,
  slug,
  likes,
  comments,
  likedByMe,
}: StoryStatsProps) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const likeStory = () => {
    if (pending) return
    startTransition(async () => {
      try {
        await toggleLikeStory(id, slug)
      } catch (e: any) {
        if (e?.message === "Unauthorized!") {
          router.push("/auth/login")
        }
      }
    })
  }

  return (
    <div className="flex flex-col border-y border-border py-5 px-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span
            onClick={likeStory}
            className={cn(
              "flex items-center gap-1 text-xs text-muted-foreground",
              pending
                ? "opacity-60 cursor-default"
                : "opacity-100 cursor-pointer"
            )}
          >
            <TooltipWrapper title="fist bumps">
              <FistIcon fisted={likedByMe} />
            </TooltipWrapper>
            {likes}
          </span>

          <span className="flex cursor-pointer items-center gap-1 text-xs text-muted-foreground">
            <Sheet>
              <SheetTrigger>
                <MessageCircle size={20} />
              </SheetTrigger>
              <Comments slug={slug} />
            </Sheet>
            {comments}
          </span>
          <span className="flex items-center text-xs text-muted-foreground">
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
  )
}

export default StoryStats

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
