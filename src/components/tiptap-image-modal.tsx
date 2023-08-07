import { SearchIcon, X } from "lucide-react"
import Image from "next/image"
import { Input } from "./ui/input"
import Wrapper from "./ui/wrapper"
import { MouseEventHandler, useState } from "react"
import { Button } from "./ui/button"

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
  onSelect,
  className,
}: {
  show: boolean
  setShow: (input: boolean) => void
  onSelect: (src: string, alt: string) => void
  className?: string
}) => {
  const [images, setImages] = useState<UnsplashImage[] | null>(null)
  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const onSearch: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()

    if (!title.length) return

    try {
      setIsLoading(true)
      const res = await fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${title}&=per_page=20`,
        {
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

  return (
    <Wrapper
      show={show}
      setShow={setShow}
      pending={false}
      className={className}
    >
      <div className="w-full max-w-screen-xl mx-auto h-full min-h-screen bg-background pt-20 flex flex-col gap-4">
        <div className="w-full flex max-w-[600px] mx-auto">
          <div className="relative w-full flex max-w-[600px] mx-auto">
            <SearchIcon
              size={15}
              className="absolute top-[50%] -translate-y-[50%] left-4 text-muted-foreground"
            />
            <Input
              placeholder="Search Unsplash"
              className="h-12 pl-12 pr-6 rounded-s-md rounded-e-none"
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
          <Button
            onClick={onSearch}
            variant="outline"
            className="h-full rounded-s-none rounded-e-md border-l-0"
          >
            <SearchIcon size={20} />
          </Button>
        </div>
        {images != null && images?.length > 0 ? (
          <div className="grid grid-cols-layout-300 pt-12 py-20 gap-4">
            {images?.map((i: UnsplashImage) => (
              <Image
                key={i.id}
                alt={i.alt_description}
                src={i.urls.small}
                width={300}
                height={200}
                style={{
                  maxHeight: "200px",
                  height: "auto",
                  objectFit: "cover",
                }}
                className="rounded-[3px] bg-border/20"
                onClick={() => {
                  onSelect(i.urls.regular, i.alt_description)
                  setShow(false)
                }}
              />
            ))}
          </div>
        ) : title.length > 0 ? (
          <p className="text-muted-foreground text-center">
            {isError
              ? "Someting went wrong!"
              : isLoading
              ? "Loading..."
              : "0 results."}{" "}
          </p>
        ) : null}
      </div>
    </Wrapper>
  )
}

export default TiptapImageModal
