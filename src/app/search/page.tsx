import TagSkeleton from "@/components/skeletons/tag-skeleton"
import { Suspense } from "react"
import Search from "./search"
import { Metadata } from "next"
import SearchCategory from "./search-category"
import SearchFilters from "./search-filters"
import SearchStoryExcerpt from "@/components/skeletons/search-story-excerpt"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Find Stories",
  description: "Discover Stories, search by name, keyword and tags.",
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
        <div className="flex items-center gap-4 justify-center w-full">
          <p className="text-muted-foreground">Recent:</p>
          <div className="flex items-center gap-4 text-sm">
            <p>Google</p>
            <p>Lord</p>
            <p>Kill tony</p>
            <p>Ethiopia</p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <SearchCategory />
          <SearchFilters />
        </div>
        {/* <Suspense
          fallback={
            <div className="grid grid-cols-layout-250 gap-8 py-6">
              {[...Array(8).keys()].map((i) => (
                <TagSkeleton key={i} />
              ))}
            </div>
          }
        >
        </Suspense> */}
        <div className="grid grid-cols-layout-250 py-12 gap-8">
          <SearchStoryExcerpt />
          <SearchStoryExcerpt />
          <SearchStoryExcerpt />
          <SearchStoryExcerpt />
          <SearchStoryExcerpt />
        </div>
      </div>
    </section>
  )
}
