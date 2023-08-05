import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Check, ChevronsUpDown } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
import { Tag } from "../../../types"
import { cn } from "@/lib/utils"

interface SelectTagsProps {
  tags: Tag[]
  values: string[]
  setValues: Dispatch<SetStateAction<string[]>>
}

const SelectTags = ({ tags, values, setValues }: SelectTagsProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          Select tags...
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 h-full">
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandEmpty>No tags found.</CommandEmpty>
          <ScrollArea className="w-[250px] h-[250px]">
            <CommandGroup>
              {tags.map((tag) => (
                <CommandItem
                  key={tag.id}
                  onSelect={() => {
                    setValues((prev) => {
                      if (prev.includes(tag.id))
                        return prev.filter((v) => v !== tag.id)
                      return [...prev, tag.id]
                    })
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      values.includes(tag.id) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {tag.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectTags
