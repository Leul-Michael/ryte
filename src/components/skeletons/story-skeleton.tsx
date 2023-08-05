import { Skeleton } from "../ui/skeleton"

const StorySkeleton = () => {
  return (
    <div className="flex flex-col gap-8 border border-border/30 p-6 w-full rounded-md">
      <Skeleton className="w-full h-[30px] rounded-full" />
      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-end">
          <Skeleton className="w-[30px] h-[30px] rounded-full" />
          <Skeleton className="w-[50px] h-[10px] rounded-full" />
        </div>
        <Skeleton className="w-[40%] h-[30px] rounded-full" />
      </div>
    </div>
  )
}

export default StorySkeleton
