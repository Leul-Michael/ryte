import { Button } from "@/components/ui/button"
import { ListFilter } from "lucide-react"
import React from "react"

const SearchFilters = () => {
  return (
    <Button variant="outline">
      <ListFilter className="h-4 w-4 mr-4 fill-muted-foreground rotate-0 scale-100 transition-all" />
      <span>Filters</span>
    </Button>
  )
}

export default SearchFilters
