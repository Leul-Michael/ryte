import Link from "next/link"

const SideBar = () => {
  return (
    <div className="flex sm:flex-col gap-6 w-full justify-start sm:justify-center h-auto sm:h-full sm:min-h-screen items-center">
      <span className="inline-block sm:h-full flex-grow bg-border h-[1px] sm:w-[1px] w-[40%]"></span>
      <Link href="/">
        <h1 className="font-serif text-2xl font-bold uppercase">Ryte</h1>
      </Link>
      <span className="inline-block sm:h-full flex-grow bg-border h-[1px] sm:w-[1px] w-full"></span>
    </div>
  )
}

export default SideBar
