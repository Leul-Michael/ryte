"use client"

import { Input } from "@/components/ui/input"
import { useSearch, useSetSearch } from "@/store/zustand"
import { SearchIcon, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { FormEventHandler, useCallback, useEffect, useState } from "react"

const Search = ({ search }: { search?: string }) => {
  const router = useRouter()
  const title = useSearch()
  const setTitle = useSetSearch()
  const [queryUpdated, setQueryUpdated] = useState(false)

  useEffect(() => {
    if (search) {
      setTitle(search)
      setQueryUpdated(true)
    }
  }, [search, setTitle])

  useEffect(() => {
    if (queryUpdated) {
      router.push(`search?q=${title}`)
      setQueryUpdated(false)
    }
  }, [queryUpdated, router, title])

  const onSearch: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setQueryUpdated(true)
  }

  const onClear = () => {
    setTitle("")
    router.push("/search")
  }

  return (
    <form
      onSubmit={onSearch}
      className="relative w-full flex max-w-[500px] mx-auto flex-col"
    >
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Search stories"
        className="h-12 pl-12 pr-6"
      />
      <SearchIcon
        size={15}
        className="absolute top-[50%] -translate-y-[50%] left-4 text-muted-foreground"
      />
      {title.length > 0 ? (
        <X
          onClick={onClear}
          size={15}
          className="absolute top-[50%] cursor-pointer -translate-y-[50%] right-2 text-muted-foreground"
        />
      ) : null}
    </form>
  )
}

export default Search
