import { cn, formatNumber } from "@/lib/utils"
import { User } from "../../../../types"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type OverviewProps = {
  user: User & {
    username: string
    status: "ACTIVE" | "BLOCKED"
    followers: number
    follows: number
    stories: number
    followedByMe: boolean
  }
}

const Overview = ({ user }: OverviewProps) => {
  return (
    <div className="flex flex-col gap-8 py-2">
      <span
        className={cn(
          "py-[0.3rem] px-4 text-xs border rounded-full w-fit font-semibold mb-4",
          user.status === "BLOCKED"
            ? "border-red-500 text-red-600"
            : "border-green-500 text-green-600"
        )}
      >
        {user.status === "BLOCKED" ? "Blocked" : "Active"}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-sm">Bio</span>
        <p className="max-w-[600px]">{user.bio}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">City</span>
          <p className="max-w-[600px]">Addis Ababa</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-sm">Country</span>
          <p className="max-w-[600px]">Ethiopia</p>
        </div>
      </div>
      <div className="flex items-center gap-x-12 gap-y-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-8">
            <span className="text-muted-foreground text-sm">Followers</span>
            <Button
              size="sm"
              disabled
              variant="outline"
              className="self-start rounded-full py-[0.3rem] px-4 text-xs h-auto"
            >
              View
            </Button>
          </div>
          <p className="max-w-[600px]">{formatNumber(user.followers)}</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-8">
            <span className="text-muted-foreground text-sm">Following</span>
            <Button
              size="sm"
              disabled
              variant="outline"
              className="self-start rounded-full py-[0.3rem] px-4 text-xs h-auto"
            >
              View
            </Button>
          </div>
          <p className="max-w-[600px]">{formatNumber(user.follows)}</p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-8">
            <span className="text-muted-foreground text-sm">Stories</span>
            <Button
              asChild
              variant="outline"
              className="self-start rounded-full py-[0.3rem] px-4 text-xs h-auto"
            >
              <Link href="/profile/my_story">View</Link>
            </Button>
          </div>
          <p className="max-w-[600px]">{formatNumber(user.stories)}</p>
        </div>
      </div>
    </div>
  )
}

export default Overview
