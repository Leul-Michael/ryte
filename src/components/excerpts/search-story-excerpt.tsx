"use client"

import Image from "next/image"
import { Ref, forwardRef, useEffect, useRef, useState } from "react"
import AvatarIcon from "../avatar"
import { FistIcon } from "../buttons"
import { formatNumber } from "@/lib/utils"
import { Story, StoryImage, User } from "../../../types"
import Link from "next/link"
import { Bookmark, BookmarkPlus } from "lucide-react"

const url = process.env.NEXT_PUBLIC_BASEURL

type StoryExcerptProps = {
  story: Story & {
    likes: number
    likedByMe: boolean
    created_at: Date
    savedByMe: boolean
  }
}

const SearchStoryExcerpt = forwardRef(
  (props: StoryExcerptProps, ref: Ref<HTMLDivElement> | null) => {
    const { story } = props

    const image = (story.thumbnail as StoryImage).src
      ? (story.thumbnail as StoryImage).src
      : `${url}/og?title=${story.title}&author=${story.user.name}&center=true`

    const imageRef = useRef<HTMLDivElement | null>(null)
    const [width, setWidth] = useState(300)

    useEffect(() => {
      const ref = imageRef.current
      if (!ref) return
      setWidth(ref.clientWidth)
    }, [])

    return (
      <Link href={`/story/${story.slug}`} className="flex flex-col gap-2">
        <div
          ref={imageRef}
          className="group relative flex h-[250px] w-full border border-border/20 rounded-lg overflow-hidden"
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
          <div className="md:group-hover:opacity-100 md:opacity-0 duration-300 absolute top-0 left-0 w-full h-full gradient-d p-5 flex items-end">
            <div className="grid grid-cols-[1fr_25px] items-center w-full">
              <h1 className="text-[0.9rem] leading-[1.1] font-semibold">
                {story.title.length > 200
                  ? story.title.slice(0, 200) + " ..."
                  : story.title}
              </h1>
              {story.savedByMe ? (
                <Bookmark
                  size={20}
                  className="min-w-4 w-4 h-4 ml-4 fill-muted-foreground"
                />
              ) : (
                <BookmarkPlus size={20} className="min-w-4 w-4 h-4 ml-4" />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <AvatarIcon
                className="w-6 h-6 text-xs"
                name={story.user.name}
                image={story.user.image}
              />
              <h6 className="text-sm font-serif">{story.user.name}</h6>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs">
                <FistIcon fisted={story.likedByMe} width="15px" />
                {formatNumber(story.likes)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }
)

SearchStoryExcerpt.displayName = "SearchStoryExcerpt"

export default SearchStoryExcerpt
