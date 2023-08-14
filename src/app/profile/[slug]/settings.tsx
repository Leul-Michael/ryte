"use client"

import { deactivate } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

const Settings = () => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  async function handleDeactivation() {
    startTransition(async () => {
      const res = await deactivate()
      if (res?.success) {
        router.push("/auth/login")
      }
    })
    router.refresh()
  }

  return (
    <div className="max-w-[600px] w-full border border-red-700 rounded-md p-6 my-4 flex flex-col gap-4">
      <p className="text-base ">Account Deactivation</p>
      <p className="text-sm text-muted-foreground">
        This action is irreversible, you won&apos;t be abel to get your accoung
        back, stories, followers and commnets associated with this account will
        be removed as well
      </p>
      <Button
        variant="destructive"
        type="submit"
        disabled={pending}
        onClick={handleDeactivation}
        className="self-start px-8 rounded-full"
      >
        {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Deactivate
      </Button>
    </div>
  )
}

export default Settings
