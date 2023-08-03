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
    <div className="flex flex-col gap-8">
      <Form tags={tags ?? []} />
    </div>
  )
}
