"use client"

import Tiptap from "@/components/tiptap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useContent, useSetTitle, useTitle } from "@/store/zustand"
import { FormEventHandler, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { SelectTags } from "./select-tags"
import { Tag } from "../../../types"

interface FormProps {
  tags: Tag[]
}

const Form = ({ tags }: FormProps) => {
  const { toast } = useToast()
  const title = useTitle()
  const setTitle = useSetTitle()
  const content = useContent()
  const [showTagsModal, setShowTagModals] = useState(false)

  const noContent =
    content.length <= 3 ||
    content === "<p></p>" ||
    content === "<h1></h1>" ||
    content === "<h2></h2>"

  const continueToAddTags: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (!title && noContent)
      return toast({
        title: "Please add all required fields!",
        variant: "destructive",
      })

    setShowTagModals(true)
  }

  return (
    <>
      <SelectTags
        tags={tags ?? []}
        openDialog={showTagsModal}
        setOpenDialog={setShowTagModals}
      />
      <form onSubmit={continueToAddTags} className="flex flex-col pb-10">
        <Button
          type="submit"
          disabled={!title || noContent}
          className={`sticky z-[99] self-end top-20 px-8 left-0 bg-accent-green hover:bg-accent-green rounded-full focus:bg-accent-green text-black ${
            showTagsModal ? "opacity-0" : "opacity-100"
          }`}
        >
          Continue
        </Button>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-5xl h-full border-0 font-serif rounded-none focus-visible:ring-0 font-semibold border-b border-border/50 py-4"
        />
        <Tiptap />
      </form>
    </>
  )
}

export default Form
