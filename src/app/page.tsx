import { Button } from "@/components/ui/button"
import { BookOpen } from "lucide-react"
import Link from "next/link"
import { auth } from "@/lib/auth"

export default async function Home() {
  const session = await auth()
  return (
    <section className="flex h-full flex-col min-h-[90vh] w-full justify-center">
      {session?.user ? <Authed /> : <UnAuthed />}
    </section>
  )
}

const Authed = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center gap-4 flex-wrap"></div>
    </div>
  )
}

const UnAuthed = () => {
  return (
    <>
      <div className="flex flex-col w-full gap-8">
        <h1 className="font-serif text-6xl font-semibold capitalize text-accent-foreground">
          <span className="uppercase">Ryte</span> your <i>thoughts!</i>
        </h1>
        <p className="text-2xl max-w-[500px]">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <Button
          variant="link"
          asChild
          className="bg-accent-green self-start min-w-[250px] py-6 hover:bg-accent-green rounded-full focus:bg-accent-green text-black"
        >
          <Link href="/auth/register">
            <BookOpen className="mr-2 h-4 w-4" /> Read on Ryte
          </Link>
        </Button>
      </div>
      <div className="flex flex-col w-full"></div>
    </>
  )
}
