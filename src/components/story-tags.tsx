"use client"

import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { Tag } from "../../types"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutGroup, motion } from "framer-motion"
import { useState } from "react"

interface StoryTagsProps {
  tags: Tag[]
}

const StoryTags = ({ tags }: StoryTagsProps) => {
  const [idx, setIdx] = useState("you")
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
          onClick={() => setIdx("you")}
          role="tab"
          className="hover:bg-transparent py-0 px-2 relative"
          variant="ghost"
        >
          <span className="relative py-1 px-2">
            For You
            {idx === "you" ? (
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
        {tags.map((t) => (
          <Button
            key={t.id}
            onClick={() => setIdx(t.id)}
            role="tab"
            className="hover:bg-transparent py-0 px-2"
            variant="ghost"
          >
            <span className="relative py-1 px-2">
              {t.title}
              {idx === t.id ? (
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
        ))}
      </nav>
    </LayoutGroup>
  )
}

export default StoryTags
