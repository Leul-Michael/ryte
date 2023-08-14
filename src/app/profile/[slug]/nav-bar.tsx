"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutGroup, motion } from "framer-motion"
import Link from "next/link"

const Navbar = ({ search }: { search: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [idx, setIdx] = useState(search ?? "overview")

  useEffect(() => {
    router.push(`${pathname}?tab=${idx}`)
  }, [idx, router, pathname])

  const isActive = (value: string) => {
    return idx === value
  }

  return (
    <nav className="flex items-center justify-normal w-fit h-full border-b border-border">
      <LayoutGroup>
        <Button
          onClick={() => setIdx("overview")}
          role="tab"
          className="hover:bg-transparent h-auto py-0 px-0 pr-2 relative"
          variant="ghost"
          asChild
        >
          <Link href={`${pathname}?tab=overview`}>
            <span
              className={cn(
                "relative py-[0.35rem] px-2 whitespace-nowrap",
                isActive("overview")
                  ? "opacity-100"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              Overview
              {idx === "overview" ? (
                <motion.div
                  className="absolute h-[2px] top-[97.5%] inset-0 bg-accent-green"
                  layoutId="sidebar"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              ) : null}
            </span>
          </Link>
        </Button>
        <Button
          onClick={() => setIdx("update")}
          role="tab"
          className="hover:bg-transparent h-auto py-0 pl-2 relative"
          variant="ghost"
        >
          <span
            className={cn(
              "relative py-[0.35rem] px-2 whitespace-nowrap",
              isActive("update")
                ? "opacity-100"
                : "opacity-70 hover:opacity-100"
            )}
          >
            Update
            {idx === "update" ? (
              <motion.div
                className="absolute h-[2px] top-[97.5%] inset-0 bg-accent-green"
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
          onClick={() => setIdx("setting")}
          role="tab"
          className="hover:bg-transparent h-auto py-0 px-0 pl-2 relative"
          variant="ghost"
        >
          <span
            className={cn(
              "relative py-[0.35rem] px-2 whitespace-nowrap",
              isActive("setting")
                ? "opacity-100"
                : "opacity-70 hover:opacity-100"
            )}
          >
            Settings
            {idx === "setting" ? (
              <motion.div
                className="absolute h-[2px] top-[97.5%] inset-0 bg-accent-green"
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
      </LayoutGroup>
    </nav>
  )
}

export default Navbar
