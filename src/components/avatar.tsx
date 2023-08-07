import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { cn } from "@/lib/utils"

interface AvatarIconProps {
  name: string | null
  image: string | null
  className?: string
}

const AvatarIcon = ({ name, image, className }: AvatarIconProps) => {
  return (
    <Avatar className={cn("w-9 h-9", className)}>
      <AvatarImage src={image ?? undefined} />
      <AvatarFallback className="select-none">
        {name?.charAt(0) ?? "U"}
      </AvatarFallback>
    </Avatar>
  )
}

export default AvatarIcon
