import SideBar from "../side-bar"
import AuthForm from "./form"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join Us",
  description: "Create an account adn start ryting your story.",
}

export default async function Login() {
  const session = await auth()

  if (session?.user) {
    redirect("/")
  }

  return (
    <section className="flex max-w-screen-lg mx-auto min-h-screen w-full items-center justify-center h-full gap-4">
      <AuthForm />
      <SideBar />
    </section>
  )
}
