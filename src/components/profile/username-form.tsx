"use client"

import { useCallback, useEffect, useState, useTransition } from "react"
import { Input } from "../ui/input"
import { useDebounce } from "use-debounce"
import { isUsedUsername, updateprofile } from "@/app/actions"
import { cn, slugify } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"

const UsernameForm = () => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [debounce] = useDebounce(name, 500)
  const [usernameExists, setUsernameExists] = useState({
    exists: false,
    checking: false,
  })

  const checkUsername = useCallback(async () => {
    try {
      setUsernameExists({
        exists: false,
        checking: true,
      })
      const res = await isUsedUsername(debounce)
      if (res)
        setUsernameExists((prev) => ({
          ...prev,
          exists: true,
        }))
    } catch {
      setUsernameExists((prev) => ({
        ...prev,
        exists: false,
      }))
    } finally {
      setUsernameExists((prev) => ({
        ...prev,
        checking: false,
      }))
    }
  }, [debounce])

  useEffect(() => {
    if (debounce) checkUsername()
  }, [debounce, checkUsername])

  const handleUpdate = () => {
    startTransition(async () => {
      const username = slugify(debounce, true)
      const res = await updateprofile({ username: "@" + username, bio })
      if (res) router.refresh()
      else {
        toast({
          title: "Someting went wrong, Try again!",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <form
      action={handleUpdate}
      className="flex flex-col gap-4 max-w-[500px] w-full"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm text-muted-foreground">
          Username
        </label>
        <div className="relative w-full">
          <Input
            placeholder="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={cn(
              usernameExists.exists ? "border-red-500" : "border-border"
            )}
          />
          {usernameExists.checking && (
            <Loader2 className="absolute top-[30%] right-0 animate-spin h-4 w-4 mx-4" />
          )}
        </div>
        <span
          data-state={usernameExists.exists ? "open" : "closed"}
          className="data-[state=closed]:opacity-0 data-[state=open]:opacity-100 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 text-red-500 text-sm px-4"
        >
          username already exists.
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="text-sm text-muted-foreground">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="resize-y w-full h-[150px] focus-visible:ring-2 ring-offset-background focus-visible:ring-ring focus-visible:ring-offset-2 outline-none text-sm bg-transparent rounded-sm border p-4 border-border"
          placeholder="tell us about your self, work, hobbies..."
          maxLength={300}
        ></textarea>
      </div>
      <Button
        type="submit"
        disabled={
          usernameExists.checking || usernameExists.exists || pending || !bio
        }
        className="self-start px-8 bg-accent-green hover:bg-accent-green rounded-full focus:bg-accent-green text-black"
      >
        {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        Continue
      </Button>
    </form>
  )
}

export default UsernameForm
