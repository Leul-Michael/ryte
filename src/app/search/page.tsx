import TagSkeleton from "@/components/skeletons/tag-skeleton"
import { Suspense } from "react"
import Search from "./search"
import { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Find Tags",
  description: "Find tags and follow for latest stories.",
}

export default async function Tag({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const title = typeof searchParams.q === "string" ? searchParams.q : undefined

  return (
    <section className="relative flex h-full flex-col min-h-[90vh] w-full py-10">
      <div className="w-full h-full flex flex-col flex-1 py-5 gap-8">
        <h1 className="font-serif text-center md:text-6xl text-5xl font-semibold leading-[1.1] capitalize text-accent-foreground">
          Find Stories
        </h1>
        <p className="text-center md:text-xl text-[1.1rem] max-w-[500px] mx-auto w-full text-muted-foreground">
          Discover Stories, search by name, keyword and tags.
        </p>
        <Search search={title} />
        <Suspense
          fallback={
            <div className="grid grid-cols-layout-250 gap-8 py-6">
              {[...Array(8).keys()].map((i) => (
                <TagSkeleton key={i} />
              ))}
            </div>
          }
        >
          {/* <Tags title={title ?? ""} /> */}
        </Suspense>
      </div>
    </section>
  )
}
