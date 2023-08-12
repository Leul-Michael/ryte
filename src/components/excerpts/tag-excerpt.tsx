"use client"

import { ScrollText, UserCheck2 } from "lucide-react"
import { Tag } from "../../../types"
import { Button } from "../ui/button"
import { toggleFollwoTag } from "@/app/actions"
import clsx from "clsx"
import {
  useTransition,
  experimental_useOptimistic as useOptimistic,
} from "react"
import { formatNumber } from "@/lib/utils"

interface TagExcerptProps {
  tag: Tag
}

const TagExcerpt = ({ tag }: TagExcerptProps) => {
  const [following, addFollowing] = useOptimistic(
    tag.followedByMe,
    (state, v: boolean) => v
  )

  let [pending, startTransition] = useTransition()

  return (
    <div className="flex flex-col justify-between border border-border rounded-md p-6 gap-6">
      <h1 className="font-serif text-3xl font-semibold capitalize text-accent-foreground">
        {tag.title.replace("-", " ")}
      </h1>
      <div className="flex items-center w-full gap-4 justify-between">
        <div className="flex gap-4 items-center">
          <span
            title="followers"
            className="flex items-center gap-1 text-muted-foreground text-xs"
          >
            <UserCheck2 size={20} />
            {formatNumber(tag?.followers ?? 0)}
          </span>
          <span
            title="story"
            className="flex items-center gap-1 text-muted-foreground text-xs"
          >
            <ScrollText size={20} />
            {formatNumber(tag?.stories ?? 0)}
          </span>
        </div>
        <Button
          disabled={pending}
          onClick={async () => {
            addFollowing(!following)
            startTransition(async () => {
              await toggleFollwoTag(tag.id)
            })
          }}
          variant="outline"
          className={clsx(
            following
              ? "focus:bg-transparent"
              : "bg-accent-green focus:bg-accent-green hover:bg-accent-green text-black hover:text-black",
            "rounded-full  py-2 h-auto text-xs"
          )}
        >
          {following ? "Following" : "Follow"}
        </Button>
      </div>
    </div>
  )
}

export default TagExcerpt
