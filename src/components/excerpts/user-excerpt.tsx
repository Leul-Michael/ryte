"use client"

import { ScrollText, UserCheck2 } from "lucide-react"
import { User } from "../../../types"
import { Button } from "../ui/button"
import { toggleFollwoUser } from "@/app/actions"
import clsx from "clsx"
import {
  useTransition,
  experimental_useOptimistic as useOptimistic,
} from "react"
import AvatarIcon from "../avatar"
import { formatNumber } from "@/lib/utils"
import Link from "next/link"

interface UserExcerptProps {
  user: User & {
    followedByMe: boolean
    followers: number
    follows: number
    stories: number
    loggedIn: boolean
  }
}

const UserExcerpt = ({ user }: UserExcerptProps) => {
  const [following, addFollowing] = useOptimistic(
    user.followedByMe,
    (state, v: boolean) => v
  )

  let [pending, startTransition] = useTransition()

  return (
    <Link
      href={`/user/${user.username}`}
      className="flex flex-col justify-between border border-border rounded-md px-5 py-4 gap-6"
    >
      <div className="flex items-center gap-4">
        <AvatarIcon
          className="md:w-9 md:h-9 w-6 h-6"
          name={user.name}
          image={user.image}
        />
        <div className="flex flex-col gap-1">
          <span className="md:text-xl font-serif">{user.name}</span>
          <span className="flex items-center gap-2 text-[0.6rem] text-muted-foreground">
            <span>Followers {formatNumber(user.followers)}</span>
            <span>Following {formatNumber(user.follows)}</span>
          </span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Joseph James Rogan is an American UFC color commentator, podcaster,
        comedian, and former television presenter.
      </p>
      <div className="flex items-center w-full gap-4 justify-between">
        <span
          title="story"
          className="flex items-center gap-1 text-muted-foreground text-xs"
        >
          <ScrollText size={20} />
          {formatNumber(user?.stories)}
        </span>
        <Button
          disabled={pending || !user.loggedIn}
          onClick={async (e) => {
            e.stopPropagation()
            addFollowing(!following)
            startTransition(async () => {
              await toggleFollwoUser(user.id, `/user`)
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
    </Link>
  )
}

export default UserExcerpt
