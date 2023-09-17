"use client"

import { useState, useTransition } from "react"
import { Button } from "./ui/button"
import DeleteStory from "./modals/delete-story"
import { deleteStory } from "@/app/actions"
import { useToast } from "./ui/use-toast"

const DeleteStoryButton = ({ id }: { id: string }) => {
  const { toast } = useToast()
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [pending, startTransition] = useTransition()

  async function handleDeleteStory() {
    startTransition(async () => {
      const res = await deleteStory(id)
      if (res?.success) {
        toast({
          title: res?.msg ?? "Operation successfull!",
        })
        setOpenConfirmModal(false)
      } else {
        toast({
          title: res?.msg ?? "Someting went wrong, Try again!",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <>
      <DeleteStory
        loading={pending}
        open={openConfirmModal}
        setOpen={setOpenConfirmModal}
        handler={handleDeleteStory}
      />
      <Button
        disabled={pending}
        variant="destructive"
        className="rounded-full  py-2 h-auto text-xs"
        onClick={() => setOpenConfirmModal((prev) => !prev)}
      >
        Delete
      </Button>
    </>
  )
}

export default DeleteStoryButton
