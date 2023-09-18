"use client"

import Tiptap from "@/components/tiptap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormEventHandler, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { SelectTagsForm } from "./tags-form"
import { cn } from "@/lib/utils"
import { useShowEditorImgModal } from "@/store/zustand"

const Form = () => {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [showTagsModal, setShowTagModals] = useState(false)
  const showImageModal = useShowEditorImgModal()

  const noContent =
    content.length <= 3 ||
    content === "<p></p>" ||
    content === "<h1></h1>" ||
    content === "<h2></h2>"

  const continueToAddTags: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (showImageModal) return
    if (!title && noContent)
      return toast({
        title: "Please add all required fields!",
        variant: "destructive",
      })

    setShowTagModals(true)
  }

  const clearInputs = () => {
    setTitle("")
    setContent("")
  }

  return (
    <>
      {showTagsModal ? (
        <SelectTagsForm
          showModal={showTagsModal}
          setShowModal={setShowTagModals}
          title={title}
          content={content}
          clear={clearInputs}
        />
      ) : null}
      <form onSubmit={continueToAddTags} className="flex flex-col pb-10">
        <Button
          type="submit"
          disabled={!title || noContent || showImageModal}
          className={cn(
            "self-end px-8 relative bg-accent-green hover:bg-accent-green rounded-full focus:bg-accent-green text-black",
            showTagsModal ? "opacity-0" : "opacity-100"
          )}
        >
          Continue
        </Button>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-5xl h-full  outline-none border-0 font-serif rounded-none focus-visible:ring-0 font-semibold border-b border-border/50 py-4"
        />
        <Tiptap content={content} setContent={setContent} />
      </form>
    </>
  )
}

export default Form
