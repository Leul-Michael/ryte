"use client"

import { Input } from "@/components/ui/input"
import { SearchIcon, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

const Search = ({ search }: { search?: string }) => {
  const router = useRouter()
  const [title, setTitle] = useState(search ?? "")
  const [debounce] = useDebounce(title, 300)

  useEffect(() => {
    if (!debounce) return router.push("/tag")
    router.push(`tag?q=${debounce}`)
  }, [debounce, router])

  return (
    <div className="relative w-full flex max-w-[500px] mx-auto flex-col">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="title..."
        className="h-12 pl-12 pr-6"
      />
      <SearchIcon
        size={15}
        className="absolute top-[50%] -translate-y-[50%] left-4 text-muted-foreground"
      />
      {title.length > 0 ? (
        <X
          onClick={() => setTitle("")}
          size={15}
          className="absolute top-[50%] cursor-pointer -translate-y-[50%] right-2 text-muted-foreground"
        />
      ) : null}
    </div>
  )
}

export default Search
