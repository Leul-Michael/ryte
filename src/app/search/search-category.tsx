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
import React, { useState } from "react"

const SearchCategory = () => {
  const [show, setShow] = useState(false)
  return (
    <DropdownMenu open={show} onOpenChange={() => setShow((prev) => !prev)}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span>Popular</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 ml-4 fill-muted-foreground scale-100 transition-all",
              show ? "rotate-180" : "rotate-0"
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="z-[100]">
        <DropdownMenuItem>Popular</DropdownMenuItem>
        <DropdownMenuItem>Following</DropdownMenuItem>
        <DropdownMenuItem>Newest</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SearchCategory
