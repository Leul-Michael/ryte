"use client"

import { LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"

const LogoutButton = () => {
  return (
    <Button
      onClick={() => {
        signOut()
      }}
      className="self-start"
      variant="outline"
    >
      Sign out
      <LogOut className="w-[0.85rem] h-[0.85rem] ml-4" />
    </Button>
  )
}

export default LogoutButton
