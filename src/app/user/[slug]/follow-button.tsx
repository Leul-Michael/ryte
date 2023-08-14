"use client"

import { toggleFollwoUser } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  useTransition,
  experimental_useOptimistic as useOptimistic,
} from "react"

const FollowButton = ({
  userId,
  followedByMe,
  username,
}: {
  userId: string
  followedByMe: boolean
  username: string
}) => {
  const [following, addFollowing] = useOptimistic(
    followedByMe,
    (state, v: boolean) => v
  )

  let [pending, startTransition] = useTransition()

  return (
    <Button
      disabled={pending}
      onClick={async (e) => {
        e.preventDefault()
        e.stopPropagation()
        addFollowing(!following)
        startTransition(async () => {
          await toggleFollwoUser(userId, `/user/${username}`)
        })
      }}
      variant="outline"
      className={cn(
        following
          ? "focus:bg-transparent"
          : "bg-accent-green focus:bg-accent-green hover:bg-accent-green text-black hover:text-black",
        "rounded-full  py-2 h-auto text-xs"
      )}
    >
      {following ? "Following" : "Follow"}
    </Button>
  )
}

export default FollowButton
