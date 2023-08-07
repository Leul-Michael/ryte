import clsx from "clsx"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, EB_Garamond } from "next/font/google"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
})
const garamond = EB_Garamond({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ryte",
  description: "This is just a simple medium clone.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(garamond.variable, inter.className, "flex flex-col")}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="antialiased max-w-screen-xl mx-auto md:px-8 px-4 flex min-h-screen flex-col w-full">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
