"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Bell, PenSquare } from "lucide-react"
import { usePathname } from "next/navigation"
import { Session } from "next-auth"
import { UserDropdown } from "./user-dropdown"
import ThemeToggle from "@/components/theme/theme-toggle"

export interface HeaderInnerProps {
  user: Session["user"] | null
}

export const HeaderInner = ({ user }: HeaderInnerProps) => {
  const pathname = usePathname()
  const hideLinks = pathname?.includes("/ryte")

  if (pathname?.includes("/auth/")) return null

  return (
    <header className="sticky z-[100] top-0 left-0 flex bg-background max-w-screen-2xl mx-auto md:px-8 px-4 justify-between items-center w-full border-b border-border py-[0.65rem]">
      <div className="flex gap-8 items-center">
        <Link href="/">
          <h1 className="font-serif text-2xl font-bold text-accent-green uppercase">
            Ryte
          </h1>
        </Link>
        {!hideLinks ? (
          <Input
            type="text"
            placeholder="Search Ryte"
            className="min-w-[300px]"
          />
        ) : null}
      </div>
      <ul className="flex gap-4 items-center">
        {user ? (
          <>
            {!hideLinks ? (
              <>
                <Button asChild variant="ghost">
                  <Link href="/ryte">
                    <PenSquare className="mr-2 h-4 w-4" /> Ryte
                  </Link>
                </Button>
                <Button className="rounded-[100%] px-[0.65rem]" variant="ghost">
                  <Bell className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </>
            ) : null}
            <UserDropdown user={user} />
          </>
        ) : (
          <>
            <Button variant="link" asChild>
              <Link href="/about">Who we are</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="/create/new">Ryte</Link>
            </Button>
            <Button
              variant="link"
              asChild
              className="bg-accent-green hover:bg-accent-green rounded-full focus:bg-accent-green text-black"
            >
              <Link href="/auth/login">Get Started</Link>
            </Button>
          </>
        )}
        <ThemeToggle />
      </ul>
    </header>
  )
}
