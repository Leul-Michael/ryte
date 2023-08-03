import { auth } from "@/lib/auth"
import { HeaderInner } from "./header-inner"
import { Suspense } from "react"

export async function Header() {
  const session = await auth()
  return (
    <>
      <Suspense fallback={<div className="flex-1 overflow-auto" />}>
        <HeaderInner user={session?.user ?? null} />
      </Suspense>
    </>
  )
}
