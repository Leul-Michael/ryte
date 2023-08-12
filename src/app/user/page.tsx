import { Suspense } from "react"
import Search from "./search"
import Users from "./users"
import UserSkeleton from "@/components/skeletons/user-skeleton"

export const dynamic = "force-dynamic"

export default async function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const name = typeof searchParams.q === "string" ? searchParams.q : undefined

  return (
    <section className="relative flex h-full flex-col min-h-[90vh] w-full py-10">
      <div className="w-full h-full flex flex-col flex-1 py-5 gap-8">
        <h1 className="font-serif text-center md:text-6xl text-5xl font-semibold leading-[1.1] capitalize text-accent-foreground">
          Users
        </h1>
        <p className="text-center md:text-xl text-[1.1rem] max-w-[500px] mx-auto w-full text-muted-foreground">
          Discover Authors and Story tellers on any topic.
        </p>
        <Search search={name} />
        <Suspense
          fallback={
            <div className="grid grid-cols-layout-250 gap-8 py-6">
              {[...Array(8).keys()].map((i) => (
                <UserSkeleton key={i} />
              ))}
            </div>
          }
        >
          <Users name={name ?? ""} />
        </Suspense>
      </div>
    </section>
  )
}
