import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex flex-col w-full h-full">
      <div className="border-t border-border max-w-screen-xl mx-auto md:px-8 px-4 w-full py-5 flex justify-between items-center gap-4 flex-wrap">
        <Link href="/">
          <h1 className="font-serif text-2xl font-bold text-accent-green uppercase">
            Ryte
          </h1>
        </Link>
        <p className="text-sm text-muted-foreground">
          ryte all rights reserved! ©2023
        </p>
      </div>
    </footer>
  )
}

export default Footer
