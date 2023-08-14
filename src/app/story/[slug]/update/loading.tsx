import { Skeleton } from "@/components/ui/skeleton"

export default function loading() {
  return (
    <section className="relative flex h-full max-w-[900px] mx-auto flex-col min-h-[90vh] w-full pt-10">
      <div className="flex flex-col gap-4">
        <Skeleton className="self-end  w-[150px] h-[30px] rounded-full" />
        <Skeleton className="w-full h-[30px] rounded-full my-4" />
        <Skeleton className="w-[80%] h-[30px] rounded-full my-4" />
      </div>
    </section>
  )
}
