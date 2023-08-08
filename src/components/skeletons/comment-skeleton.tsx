import React from "react"
import { Skeleton } from "../ui/skeleton"

const CommentSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 py-2 w-full rounded-md">
      <div className="flex gap-4 items-end">
        <Skeleton className="w-[40px] h-[40px] rounded-full" />
        <Skeleton className="w-[100px] h-[10px] rounded-full" />
      </div>
      <Skeleton className="w-full h-[15px] rounded-full" />
    </div>
  )
}

export default CommentSkeleton
