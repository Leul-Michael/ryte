import React from "react"
import { Skeleton } from "../ui/skeleton"

const UserSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 border border-border/30 p-6 w-full rounded-md">
      <div className="flex gap-4 items-end">
        <Skeleton className="w-[40px] h-[40px] rounded-full" />
        <Skeleton className="w-[100px] h-[10px] rounded-full" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-[10px] rounded-full" />
        <Skeleton className="w-[75%] h-[10px] rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="w-[50px] h-[10px] rounded-full" />
        <Skeleton className="w-[40%] h-[30px] rounded-full" />
      </div>
    </div>
  )
}

export default UserSkeleton
