import Link from "next/link"

const SideBar = () => {
  return (
    <div className="flex flex-col gap-6 w-full justify-center h-full min-h-screen items-center">
      <span className="inline-block h-full flex-grow bg-border w-[1px]"></span>
      <Link href="/">
        <h1 className="font-serif text-2xl font-bold uppercase">Ryte</h1>
      </Link>
      <span className="inline-block h-full flex-grow bg-border w-[1px]"></span>
    </div>
  )
}

export default SideBar
