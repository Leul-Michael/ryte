import { Tag } from "../../../types"
import { Dispatch, SetStateAction, useState, useTransition } from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

import { cn } from "@/lib/utils"
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

import { saveStory } from "@/app/actions"
import { redirect } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import * as DOMPurify from "dompurify"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { X } from "lucide-react"
import parse from "html-react-parser"
import Wrapper from "@/components/ui/wrapper"

interface SelectTagsProps {
  tags: Tag[]
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  title: string
  content: string
  clear: () => void
}

export function SelectTags({
  tags,
  showModal,
  setShowModal,
  title,
  content,
  clear,
}: SelectTagsProps) {
  const { toast } = useToast()
  const [pending, startTransition] = useTransition()

  const imgTag = content.match(/<img\s+src=\"(.*?)\"[^>]*>/gi)

  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<string[]>([])

  const createStory = async () => {
    if (!title || !content) {
      toast({
        title: "Please add required fields!",
        variant: "destructive",
      })
    }
    const pureContent = DOMPurify.sanitize(content)
    startTransition(async () => {
      const res = await saveStory({
        title,
        content: pureContent,
        tags: values,
      })
      toast({
        title: res?.msg ?? "Operation successfull!",
      })
    })
    clear()
    redirect("/")
  }

  return (
    <Wrapper show={showModal} setShow={setShowModal} pending={pending}>
      <Card className="w-full max-w-[500px] relative">
        <CardHeader>
          <h1 className="text-4xl font-semibold font-serif">Add tags</h1>
        </CardHeader>
        <CardContent>
          <form action={createStory} className="flex flex-col gap-8">
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
                              values.includes(tag.id)
                                ? "opacity-100"
                                : "opacity-0"
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
            <div className="flex flex-wrap w-full gap-4">
              {values.length > 0 ? (
                values.map((v) => {
                  const tag = tags.find((t) => t.id === v)
                  if (!tag) return null
                  return (
                    <p
                      className="py-1 px-2 rounded-lg border border-border"
                      key={tag.id}
                    >
                      {tag?.title}
                    </p>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">
                  Please select atleast 2 tags.
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={values.length < 2 || pending}
              className="self-start top-20 px-8 left-0 bg-accent-green hover:bg-accent-green rounded-full focus:bg-accent-green text-black"
            >
              {pending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Publish
            </Button>
          </form>
        </CardContent>
      </Card>
    </Wrapper>
  )
}
