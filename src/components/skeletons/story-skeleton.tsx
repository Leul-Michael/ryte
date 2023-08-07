import { Skeleton } from "../ui/skeleton"

const StorySkeleton = () => {
  return (
    <div className="flex flex-col gap-2 py-6 w-full rounded-md">
      <div className="flex gap-4 items-end mb-8">
        <Skeleton className="w-[40px] h-[40px] rounded-full" />
        <Skeleton className="w-[100px] h-[10px] rounded-full" />
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-4 w-3/4">
          <Skeleton className="w-full h-[15px] rounded-full" />
          <Skeleton className="w-full h-[15px] rounded-full" />
          <Skeleton className="w-[40%] h-[5px] rounded-full" />
        </div>
        <div className="w-1/4">
          <Skeleton className="w-full h-full rounded-sm" />
        </div>
      </div>
    </div>
  )
}

export default StorySkeleton
