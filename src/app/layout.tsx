import clsx from "clsx"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, EB_Garamond } from "next/font/google"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import RequireProfile from "@/components/profile/require-profile"

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
  metadataBase: new URL(process.env.NEXTAUTH_URL as string),
  title: {
    default: "Explore stories | Ryte",
    template: "%s | Ryte",
  },
  description: "Developer, writer, and creator.",
  openGraph: {
    title: "Explore stories",
    description:
      "Discover topics, thinking, and expertise from writers on any topic.",
    url: process.env.NEXTAUTH_URL as string,
    siteName: "Ryte",
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: '',
  //   yandex: '',
  // },
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
          {/* Modal for user to fill required fileds  */}
          <RequireProfile />
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
