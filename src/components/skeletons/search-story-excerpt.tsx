"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const url = process.env.NEXT_PUBLIC_BASEURL

const SearchStoryExcerpt = () => {
  const image =
    "https://ryte-story.vercel.app/og?title=Google is fucked&author=Leul Michael&center=true"

  const imageRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(300)

  useEffect(() => {
    const ref = imageRef.current
    if (!ref) return
    setWidth(ref.clientWidth)
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={imageRef}
        className="flex h-[220px] w-full border border-border rounded-lg overflow-hidden"
      >
        <Image
          src={image}
          alt="Google image"
          width={width}
          height={250}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-serif">Google is funcled up man</h1>
        <div className="flex"></div>
      </div>
    </div>
  )
}

export default SearchStoryExcerpt
