import { auth } from "@/lib/auth"
import { cn } from "@/lib/utils"
import LogoutButton from "./logout-button"
import UsernameForm from "./username-form"

export default async function RequireProfile() {
  const session = await auth()

  if (!session?.user || session.user.username.startsWith("@")) return null

  return (
    <article
      data-state="open"
      className={cn(
        "px-5 fixed z-[51] flex flex-col top-0 left-0 w-full h-full overflow-auto min-h-screen bg-background"
      )}
    >
      <div className="flex flex-col max-w-[800px] mx-auto w-full gap-8 py-20">
        <LogoutButton />
        <div className="flex flex-col gap-8">
          <h1 className="md:text-4xl text-2xl font-serif font-semibold leading-none">
            Please fill these fields before continuing.
          </h1>
          <UsernameForm />
        </div>
      </div>
    </article>
  )
}
