"use client"

import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { Tag } from "../../types"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutGroup, motion } from "framer-motion"
import { useEffect, useState, useTransition } from "react"
import { fetcher } from "@/lib/utils"
import useSWR from "swr"
import { Skeleton } from "./ui/skeleton"
import { useRouter } from "next/navigation"

// interface StoryTagsProps {
//   tags: Tag[]
// }

const StoryTags = ({ search }: { search: string | null }) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { data, isLoading } = useSWR("/api/tag/follow", fetcher, {
    revalidateOnMount: true,
  })
  const [idx, setIdx] = useState(search ?? "for-you")

  useEffect(() => {
    if (!idx || idx === "for-you") return router.push("/")
    router.push(`?tag=${idx}`)
  }, [idx, router])

  const isActive = (value: string) => {
    return idx === value
  }

  return (
    <LayoutGroup>
      <nav
        role="tablist"
        className="relative flex items-center justify-normal w-fit min-w-[500px] border-b border-border"
      >
        <Link role="tab" className="hover:bg-transparent px-0" href="/tag">
          <Plus size={20} />
        </Link>
        <Button
          disabled={isPending}
          onClick={() => startTransition(() => setIdx("for-you"))}
          role="tab"
          className="hover:bg-transparent py-0 px-2 relative"
          variant="ghost"
        >
          <span
            className={clsx(
              "relative py-1 px-2 whitespace-nowrap",
              isActive("for-you")
                ? "opacity-100"
                : "opacity-70 hover:opacity-100"
            )}
          >
            For You
            {idx === "for-you" ? (
              <motion.div
                className="absolute h-[1px] top-[120%] mx-2 inset-0 bg-accent-green"
                layoutId="sidebar"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30,
                }}
              />
            ) : null}
          </span>
        </Button>
        {isLoading ? (
          <Skeleton className="w-full h-[20px] rounded-md" />
        ) : (
          data?.tags?.map((t: Tag) => (
            <Button
              disabled={isPending}
              key={t.title}
              onClick={() =>
                startTransition(() => setIdx(t.title.toLowerCase()))
              }
              role="tab"
              className="hover:bg-transparent py-0 px-2"
              variant="ghost"
            >
              <span
                className={clsx(
                  "relative py-1 px-2 whitespace-nowrap",
                  isActive(t.title.toLowerCase())
                    ? "opacity-100"
                    : "opacity-70 hover:opacity-100"
                )}
              >
                {t.title}
                {idx === t.title.toLowerCase() ? (
                  <motion.div
                    className="absolute h-[1px] top-[120%] mx-2 inset-0 bg-accent-green"
                    layoutId="sidebar"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                ) : null}
              </span>
            </Button>
          ))
        )}
      </nav>
    </LayoutGroup>
  )
}

export default StoryTags
