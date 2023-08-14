"use client"

import AvatarIcon from "@/components/avatar"
import { HoverCardContent } from "@/components/ui/hover-card"
import { User } from "../../../../types"
import { Session } from "next-auth/types"
import { Button } from "@/components/ui/button"
import { cn, formatNumber } from "@/lib/utils"
import { useTransition } from "react"
import { toggleFollwoUser } from "@/app/actions"

interface AuthorCardProps {
  isAuthor: boolean
  user: User & {
    followers: User[]
    _count: {
      followers: number
      follows: number
    }
  }
  session: Session["user"]
  slug: string
}

const AuthorCard = ({ isAuthor, user, session, slug }: AuthorCardProps) => {
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
    <HoverCardContent align="start">
      <div className="flex gap-4">
        <AvatarIcon
          className="h-8 w-8"
          name={user.name ?? null}
          image={user.image ?? null}
        />

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-serif font-semibold leading-[1.1]">
              {user.name}
            </h1>
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-xs text-muted-foreground">
                followers {formatNumber(user._count.followers)}
              </p>
              <p className="text-xs text-muted-foreground">
                following {formatNumber(user._count.follows)}
              </p>
            </div>
          </div>
          <p className="text-xs">
            {user.bio && user.bio?.length > 75
              ? user.bio.slice(0, 75) + " ..."
              : user.bio}
          </p>
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
                "rounded-full self-start py-1 min-w-[70px] h-auto text-[0.6rem]"
              )}
            >
              {user.followers.length > 0 ? "Following" : "Follow"}
            </Button>
          )}
        </div>
      </div>
    </HoverCardContent>
  )
}

export default AuthorCard
