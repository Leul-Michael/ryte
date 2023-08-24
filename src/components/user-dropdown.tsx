import {
  Cloud,
  CreditCard,
  Github,
  LifeBuoy,
  Settings,
  Sparkle,
  User,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LogoutButton from "./ui/logout-button"
import { HeaderInnerProps } from "./header-inner"
import AvatarIcon from "./avatar"
import Link from "next/link"

export async function UserDropdown({ user }: HeaderInnerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none hidden md:flex">
        <AvatarIcon
          name={user?.name?.charAt(0) ?? "U"}
          image={user?.image ?? null}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 z-[100]">
        <DropdownMenuLabel>
          <p className="text-lg">{user?.name}</p>
          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${user?.username}?tab=overview`}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/profile/story`}>
              <User className="mr-2 h-4 w-4" />
              <span>My story</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Stats</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkle className="mr-2 h-4 w-4" />
            <span>Become a member</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
