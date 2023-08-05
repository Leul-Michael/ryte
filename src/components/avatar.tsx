import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface AvatarIconProps {
  name: string | null
  image: string | null
}

const AvatarIcon = ({ name, image }: AvatarIconProps) => {
  return (
    <Avatar className="w-9 h-9">
      <AvatarImage src={image ?? undefined} />
      <AvatarFallback className="select-none">
        {name?.charAt(0) ?? "U"}
      </AvatarFallback>
    </Avatar>
  )
}

export default AvatarIcon
