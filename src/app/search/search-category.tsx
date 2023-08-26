"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { Session } from "next-auth/types"
import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const SearchCategory = ({
  user,
  sort = "popular",
}: {
  user: Session["user"] | null
  sort: string
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const q = searchParams.get("q")
  const [sortBy, setSortBy] = useState(sort)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sortBy) {
      if (q) return router.push(`search?q=${q}&sort=${sortBy}`)
      router.push(`search?sort=${sortBy}`)
    }
  }, [sortBy, router, q])

  return (
    <DropdownMenu open={show} onOpenChange={() => setShow((prev) => !prev)}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {sortBy === "popular" ? (
            <span>Popular</span>
          ) : sortBy === "new" ? (
            "Newest"
          ) : (
            "Following"
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 ml-4 fill-muted-foreground scale-100 transition-all",
              show ? "rotate-180" : "rotate-0"
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="z-[100]">
        <DropdownMenuItem onClick={() => setSortBy("popular")}>
          Popular
        </DropdownMenuItem>
        {user ? (
          <DropdownMenuItem onClick={() => setSortBy("following")}>
            Following
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem onClick={() => setSortBy("new")}>
          Newest
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SearchCategory
