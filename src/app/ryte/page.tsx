import { Metadata } from "next"
import Form from "./form"

export const metadata: Metadata = {
  title: "Ryte story",
  description: "Create and share your story.",
}

export default async function page() {
  return (
    <section className="relative flex h-full max-w-[900px] mx-auto flex-col min-h-[90vh] w-full pt-10">
      <Form />
    </section>
  )
}
