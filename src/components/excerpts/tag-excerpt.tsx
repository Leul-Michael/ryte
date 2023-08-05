"use client"

import { ScrollText, UserCheck2 } from "lucide-react"
import { Tag } from "../../../types"
import { Button } from "../ui/button"
import { toggleFollwoTag } from "@/app/actions"
import clsx from "clsx"
import { useTransition } from "react"

interface TagExcerptProps {
  tag: Tag
}

const TagExcerpt = ({ tag }: TagExcerptProps) => {
  let [pending, startTransition] = useTransition()

  return (
    <div className="flex flex-col justify-between border border-border rounded-md p-6 gap-8">
      <h1 className="font-serif text-3xl font-semibold capitalize text-accent-foreground">
        {tag.title}
      </h1>
      <div className="flex items-center w-full gap-4 justify-between">
        <div className="flex gap-4 items-center">
          <span
            title="followers"
            className="flex flex-col items-start gap-1 text-muted-foreground text-xs"
          >
            <UserCheck2 size={20} />
            2.5k
          </span>
          <span
            title="story"
            className="flex flex-col items-start gap-1 text-muted-foreground text-xs"
          >
            <ScrollText size={20} />
            2.5k
          </span>
        </div>
        <Button
          disabled={pending}
          onClick={async () => {
            startTransition(async () => {
              await toggleFollwoTag(tag.id)
            })
          }}
          variant="outline"
          className={clsx(
            tag.followedByMe
              ? "focus:bg-transparent"
              : "bg-accent-green focus:bg-accent-green hover:bg-accent-green text-black hover:text-black",
            "rounded-full  py-2 h-auto text-xs"
          )}
        >
          {tag.followedByMe ? "Following" : "Follow"}
        </Button>
      </div>
    </div>
  )
}

export default TagExcerpt
