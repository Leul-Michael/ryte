import { ReactNode } from "react"

export default function RyteRootLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative flex h-full max-w-[900px] mx-auto flex-col min-h-[90vh] w-full pt-10">
      {children}
    </section>
  )
}
