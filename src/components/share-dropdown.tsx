import { ClipboardCopy, Linkedin, Send, Share2, Twitter } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export async function ShareDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Share2 size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 z-[100]">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ClipboardCopy className="mr-2 h-4 w-4" />
            <span>Copy to clipboard</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Send className="mr-2 h-4 w-4" />
            <span>Share on telegram</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Twitter className="mr-2 h-4 w-4" />
            <span>Share on twitter</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Linkedin className="mr-2 h-4 w-4" />
            <span>Share on linkedin</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
