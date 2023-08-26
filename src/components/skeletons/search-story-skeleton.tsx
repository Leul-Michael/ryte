import { Skeleton } from "../ui/skeleton"

const SearchStorySkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full rounded-md">
      <Skeleton className="w-full rounded-lg h-[250px]" />
      <div className="flex gap-4 items-end">
        <Skeleton className="w-[30px] h-[30px] rounded-full" />
        <Skeleton className="w-[100px] h-[10px] rounded-full" />
      </div>
      <Skeleton className="w-full h-[10px] rounded-full" />
    </div>
  )
}

export default SearchStorySkeleton
