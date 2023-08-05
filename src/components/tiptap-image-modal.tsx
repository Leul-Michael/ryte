import { Editor } from "@tiptap/react"
import { SearchIcon, X } from "lucide-react"
import Image from "next/image"
import { Input } from "./ui/input"
import Wrapper from "./ui/wrapper"
import { useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

interface UnsplashImage {
  id: string
  alt_description: string
  user: {
    id: string
    name: string
  }
  urls: {
    small: string
    regular: string
    full: string
  }
  blur_hash: string
}

const TiptapImageModal = ({
  show,
  setShow,
  editor,
}: {
  show: boolean
  setShow: (input: boolean) => void
  editor: Editor
}) => {
  const [images, setImages] = useState([])
  const [title, setTitle] = useState("")
  const [debounce] = useDebounce(title, 500)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    async function searchImages() {
      try {
        setIsLoading(true)
        const res = await fetch(
          `https://api.unsplash.com/search/photos?page=1&query=${debounce}`,
          {
            signal,
            headers: {
              Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
            },
          }
        )
        const data = await res.json()
        setImages(data?.results ?? [])
      } catch {
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    debounce.length && searchImages()

    return () => {
      controller.abort()
    }
  }, [debounce])

  return (
    <Wrapper show={show} setShow={setShow} pending={false}>
      <div className="w-full max-w-screen-xl mx-auto h-screen bg-background pt-20 flex flex-col gap-4">
        <div className="relative w-full flex max-w-[600px] mx-auto flex-col">
          <SearchIcon
            size={15}
            className="absolute top-[50%] -translate-y-[50%] left-4 text-muted-foreground"
          />
          <Input
            placeholder="Search Unsplash"
            className="h-12 pl-12 pr-6"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {title.length > 0 ? (
            <X
              onClick={() => setTitle("")}
              size={15}
              className="absolute top-[50%] cursor-pointer -translate-y-[50%] right-3 text-muted-foreground"
            />
          ) : null}
        </div>
        {images.length > 0 ? (
          <div className="grid grid-cols-layout-300 pt-12 py-20 gap-4">
            {images?.map((i: UnsplashImage) => (
              <Image
                key={i.id}
                alt={i.alt_description}
                src={i.urls.small}
                width={300}
                height={200}
                className="object-cover rounded-[3px] bg-border/20"
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .setImage({ src: i.urls.regular, alt: i.alt_description })
                    .run()
                  setShow(false)
                }}
              />
            ))}
          </div>
        ) : title.length > 0 && !isLoading ? (
          <p className="text-muted-foreground text-center">
            {isError ? "Someting went wrong!" : "No results found!"}{" "}
          </p>
        ) : null}
      </div>
    </Wrapper>
  )
}

export default TiptapImageModal
