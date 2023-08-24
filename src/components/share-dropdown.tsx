import { ClipboardCopy, Linkedin, Send, Share2, Twitter } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

const url = process.env.NEXT_PUBLIC_BASEURL as string

export function ShareDropdown({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false)
  const copyLink = () => {
    setCopied(true)
    navigator.clipboard.writeText(`${url}/story/${slug}`)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Share2 size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 z-[100]">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={copyLink}>
            <ClipboardCopy className="mr-2 h-4 w-4" />
            <span>{copied ? "Copied" : "Copy to clipboard"}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <a
              href={`tg://msg_url?url=${url}/story/${slug}&text=Read%20Story`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="mr-2 h-4 w-4" />
              <span>Share on telegram</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              target="_blank"
              href={`https://twitter.com/intent/tweet?url=${url}/story/${slug}&text=Read%20Story`}
              rel="noopener noreferrer"
            >
              <Twitter className="mr-2 h-4 w-4" />
              <span>Share on twitter</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a
              target="_blank"
              href={` https://www.linkedin.com/sharing/share-offsite/?url=${url}/story/${slug}`}
              rel="noopener noreferrer"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              <span>Share on linkedin</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
