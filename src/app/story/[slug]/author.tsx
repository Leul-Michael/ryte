"use client"

import AvatarIcon from "@/components/avatar"
import React, { useTransition } from "react"
import { AuthorCardProps } from "./author-card"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { toggleFollwoUser } from "@/app/actions"
import { cn, formatNumber } from "@/lib/utils"

const Author = ({ user, isAuthor, session, slug }: AuthorCardProps) => {
  const [pending, startTransition] = useTransition()

  const followUser = () => {
    if (pending || !session) return
    startTransition(async () => {
      try {
        await toggleFollwoUser(user.id, `/story/${slug}`)
      } catch (e: any) {
        console.log(e)
      }
    })
  }

  return (
    <div className="flex flex-col gap-4 md:p-6 p-4 bg-muted/50 rounded-md mt-8">
      <div className="flex items-center justify-between gap-8 flex-wrap">
        <div className="flex items-center gap-4">
          <AvatarIcon
            className="md:h-[2.85rem] md:w-[2.85rem] h-10 w-10"
            name={user.name}
            image={user.image}
          />
          <div className="flex flex-col">
            <span className="md:text-xl font-serif">{user.name}</span>
            <div className="flex items-center gap-2 md:text-sm text-xs text-muted-foreground">
              <span> Joined</span>
              <span>
                {user.created_at
                  ? format(new Date(user.created_at), "MMM dd,yyyy")
                  : null}
              </span>
            </div>
          </div>
        </div>
        {isAuthor || !session ? null : (
          <Button
            disabled={!session || pending}
            onClick={followUser}
            variant="outline"
            size="sm"
            className={cn(
              user.followers.length > 0
                ? "focus:bg-transparent"
                : "bg-accent-green focus:bg-accent-green hover:bg-accent-green text-black hover:text-black",
              "rounded-full self-start py-1 min-w-[70px] text-sm"
            )}
          >
            {user.followers.length > 0 ? "Following" : "Follow"}
          </Button>
        )}
      </div>
      <div className="flex items-center gap-4 flex-wrap text-muted-foreground text-sm">
        <span>Followers {formatNumber(user._count.followers)}</span>
        <span>Following {formatNumber(user._count.follows)}</span>
      </div>
      <p className="text-sm">{user.bio}</p>
    </div>
  )
}

export default Author
