import { Tag } from "../../../types"
import prisma from "@/lib/prisma"
import Form from "./form"

async function getTags() {
  const tags = await prisma.tag.findMany({
    orderBy: {
      created_at: "desc",
    },
  })
  return tags as Tag[]
}

export default async function page() {
  let tags
  try {
    tags = await getTags()
  } catch (e) {
    console.error(e)
  }

  return (
    <section className="relative flex h-full max-w-[900px] mx-auto flex-col min-h-[90vh] w-full pt-10">
      <Form tags={tags ?? []} />
    </section>
  )
}
