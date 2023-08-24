import { Suspense } from "react"
import Stories from "./stories"
import StorySkeleton from "@/components/skeletons/story-skeleton"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "My story",
  description: " Manage your stories by making them attractive to readers.",
}

export default async function MyStory() {
  return (
    <section className="relative flex h-full flex-col min-h-[90vh] w-full pb-10">
      <div className="w-full h-full flex flex-col flex-1 gap-8 py-8 max-w-[900px] mx-auto">
        <h1 className="text-5xl font-serif font-semibold leading-none">
          My Story
        </h1>
        <Suspense
          fallback={
            <div className="flex flex-col gap-2 w-full">
              {[...Array(2).keys()].map((i) => (
                <StorySkeleton key={i} />
              ))}
            </div>
          }
        >
          <Stories />
        </Suspense>
      </div>
    </section>
  )
}
