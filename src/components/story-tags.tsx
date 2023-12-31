"use client"

import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { Tag } from "../../types"
import Link from "next/link"
import { LayoutGroup, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { cn } from "@/lib/utils"

interface StoryTagsProps {
  tags: Tag[]
  search: string | null
}

const StoryTags = ({ tags, search }: StoryTagsProps) => {
  const router = useRouter()
  const [idx, setIdx] = useState(search ?? "for-you")

  useEffect(() => {
    if (!idx || idx === "for-you") return router.push("/")
    else router.push(`?tag=${idx}`)
    router.refresh()
  }, [idx, router])

  const isActive = (value: string) => {
    return idx === value
  }

  return (
    <ScrollArea className="w-full overflow-auto h-full hide-scroll">
      <ScrollBar orientation="horizontal" />
      <nav className="flex items-center justify-normal w-full min-w-[500px] h-full overflow-hidden border-b border-border/50">
        <LayoutGroup>
          <Link role="tab" className="hover:bg-transparent px-0" href="/tag">
            <Plus size={20} />
          </Link>
          <Button
            onClick={() => setIdx("for-you")}
            role="tab"
            className="hover:bg-transparent h-auto py-0 px-2 relative"
            variant="ghost"
          >
            <span
              className={cn(
                "relative py-[0.35rem] px-2 whitespace-nowrap",
                isActive("for-you")
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              For You
              {idx === "for-you" ? (
                <motion.div
                  className="absolute h-[2px] top-[97.5%] mx-2 inset-0 bg-accent-green"
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
          <Button
            onClick={() => setIdx("following")}
            role="tab"
            className="hover:bg-transparent h-auto py-0 px-2 relative"
            variant="ghost"
          >
            <span
              className={cn(
                "relative py-[0.35rem] px-2 whitespace-nowrap",
                isActive("following")
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              Following
              {idx === "following" ? (
                <motion.div
                  className="absolute h-[2px] top-[97.5%] mx-2 inset-0 bg-accent-green"
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
          {tags?.map((t: Tag) => (
            <Button
              key={t.title}
              onClick={() => setIdx(t.title.toLowerCase())}
              role="tab"
              className="hover:bg-transparent h-auto py-0 px-2"
              variant="ghost"
            >
              <span
                className={cn(
                  "relative py-[0.35rem] px-2 whitespace-nowrap",
                  isActive(t.title.toLowerCase())
                    ? "opacity-100"
                    : "opacity-70 hover:opacity-100"
                )}
              >
                {t.title.replace("-", " ")}
                {idx === t.title.toLowerCase() ? (
                  <motion.div
                    className="absolute h-[1px] top-[97.5%] mx-2 inset-0 bg-accent-green"
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
          ))}
        </LayoutGroup>
      </nav>
    </ScrollArea>
  )
}

export default StoryTags
