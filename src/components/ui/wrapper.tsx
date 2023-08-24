"use client"

import { X } from "lucide-react"
import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface WrapperProps {
  children: ReactNode
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>> | ((input: boolean) => void)
  pending: boolean
  className?: string
}

const Wrapper = ({
  children,
  show,
  setShow,
  pending,
  className,
}: WrapperProps) => {
  const containerRef = useRef<HTMLElement | null>(null)
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (show) document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [show])

  //   useEffect(() => {
  //     const ref = containerRef.current
  //     if (!ref || pending) return

  //     const handleClickOutside = (e: MouseEvent) => {
  //       if (e.target === closeBtnRef.current) return

  //       if (
  //         !pending &&
  //         containerRef.current?.contains(e.target as Element) &&
  //         e.target === containerRef.current
  //       ) {
  //         console.log("Here")

  //         // setShow(false)
  //       }
  //     }

  //     ref.addEventListener("mousedown", handleClickOutside)

  //     return () => {
  //       ref?.addEventListener("mousedown", handleClickOutside)
  //     }
  //   }, [pending, setShow])

  return (
    <article
      ref={containerRef}
      data-state={show ? "open" : "closed"}
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed z-[51] flex flex-col justify-center items-center top-0 left-0 w-full h-full min-h-screen bg-background",
        className ?? ""
      )}
    >
      <Button
        ref={closeBtnRef}
        onClick={() => !pending && setShow(false)}
        disabled={pending}
        variant="outline"
        size="icon"
        className="cursor-pointer self-end sticky w-[40px] min-w-[40px] h-[40px] min-h-[40px] md:mx-10 mx-5 right-0 md:right-12 top-3 rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
      <span onClick={() => !pending && setShow(false)}></span>
      {children}
    </article>
  )
}

export default Wrapper
