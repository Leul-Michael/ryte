import React from "react"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"

const StoryTags = () => {
  return (
    <div
      role="tablist"
      className="relative flex items-center justify-normal w-fit min-w-[500px] border-b border-border py-2"
    >
      <Button role="tab" className="hover:bg-transparent px-0" variant="ghost">
        <Plus />
      </Button>
      <Button role="tab" className="hover:bg-transparent" variant="ghost">
        For You
      </Button>
      <Button role="tab" className="hover:bg-transparent" variant="ghost">
        Programming
      </Button>
      <Button role="tab" className="hover:bg-transparent" variant="ghost">
        Google
      </Button>
      <Button role="tab" className="hover:bg-transparent" variant="ghost">
        Foods
      </Button>
    </div>
  )
}

export default StoryTags
