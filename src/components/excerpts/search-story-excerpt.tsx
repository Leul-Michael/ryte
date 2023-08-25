"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import AvatarIcon from "../avatar"
import { FistIcon } from "../buttons"
import { formatNumber } from "@/lib/utils"

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
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <AvatarIcon
              className="w-6 h-6 text-xs"
              name="Leul Michael"
              image={null}
            />
            <h6 className="text-sm font-serif">Leul Michael</h6>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs">
              <FistIcon fisted={false} />
              {formatNumber(12500)}
            </span>
          </div>
        </div>
        <h1 className="text-sm font-serif">Google is funcled up man</h1>
      </div>
    </div>
  )
}

export default SearchStoryExcerpt
