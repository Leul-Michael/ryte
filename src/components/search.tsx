"use client"

import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { Search } from "lucide-react"
import { useSearch, useSetSearch } from "@/store/zustand"

type SearchProps = {
  className?: string
  onClick: () => void
}

const SearchInput = ({ className, onClick }: SearchProps) => {
  const search = useSearch()
  const setSearch = useSetSearch()
  return (
    <div className={cn("relative w-full", className ?? "")}>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search Ryte"
        className="min-w-[300px] rounded-full w-full pr-7"
      />
      <button
        onClick={onClick}
        className="cursor-pointer absolute top-0 right-0 flex justify-center items-center w-full h-full max-w-[45px] rounded-full"
      >
        <Search size={15} className="text-muted-foreground" />
      </button>
    </div>
  )
}

export default SearchInput
