import { Tag } from "../../../types"
import { Dispatch, SetStateAction, useState, useTransition } from "react"
import { Loader2 } from "lucide-react"

import { getDescription, getThumbnail } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import { saveStory } from "@/app/actions"
import { redirect } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import * as DOMPurify from "dompurify"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Wrapper from "@/components/ui/wrapper"
import SelectTags from "./select-tags"
import { useContentJson } from "@/store/zustand"
import Image from "next/image"

interface SelectTagsFormProps {
  tags: Tag[]
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  title: string
  content: string
  clear: () => void
}

export function SelectTagsForm({
  tags,
  showModal,
  setShowModal,
  title,
  content,
  clear,
}: SelectTagsFormProps) {
  const { toast } = useToast()
  const [pending, startTransition] = useTransition()

  const contentJson = useContentJson()
  const contentDescripton = getDescription(contentJson)
  const contentThumbnail = getThumbnail(contentJson)
  const [thumbnail, setThumbnail] = useState(contentThumbnail)
  const [description, setDescription] = useState<string>(contentDescripton)
  const [values, setValues] = useState<string[]>([])

  console.log(contentThumbnail)

  const createStory = async () => {
    if (!title || !content) {
      toast({
        title: "Please add required fields!",
        variant: "destructive",
      })
    }
    const pureContent = DOMPurify.sanitize(content)
    startTransition(async () => {
      const res = await saveStory({
        title,
        content: pureContent,
        description: description.length > 0 ? description : contentDescripton,
        thumbnail,
        tags: values,
      })
      if (res?.story) {
        toast({
          title: res?.msg ?? "Operation successfull!",
        })
        clear()
        redirect("/")
      } else {
        toast({
          title: "Someting went wrong, Try again!",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <Wrapper show={showModal} setShow={setShowModal} pending={pending}>
      <Card className="w-full max-w-[850px] relative">
        <CardContent className="p-6">
          <form action={createStory} className="flex flex-col gap-8 w-full">
            <div className="flex items-start gap-8 flex-wrap w-full">
              <div className="flex flex-col gap-8 h-full w-full min-w-[350px] max-w-[450px]">
                {thumbnail.src ? (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-muted-foreground max-w-[80%]">
                      Preview Image
                    </p>
                    <Image
                      src={thumbnail.src}
                      alt={thumbnail.alt ?? ""}
                      width={400}
                      height={200}
                      className="max-h-[200px] object-cover"
                    />{" "}
                  </div>
                ) : null}
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-muted-foreground max-w-[80%]">
                    Add description about the story, by default the first few
                    lines of the story will be used.
                  </p>
                  <div className="flex flex-col gap-2 py-4">
                    {description.length <= 0 ? (
                      <p className="text-[0.65rem] text-red-500">
                        Description is required!
                      </p>
                    ) : null}
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="resize-y w-full h-[100px] outline-none text-sm py-2 focus:border-border bg-transparent border-b border-border/60"
                      placeholder="description..."
                      maxLength={300}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full max-w-[270px]">
                <h1 className="text-2xl font-semibold font-serif">Add tags</h1>
                <SelectTags tags={tags} values={values} setValues={setValues} />
                <div className="flex flex-wrap w-full gap-2">
                  {values.length > 0 ? (
                    values.map((v) => {
                      const tag = tags.find((t) => t.id === v)
                      if (!tag) return null
                      return (
                        <p
                          className="py-1 px-2 text-xs rounded-lg border border-border"
                          key={tag.id}
                        >
                          {tag?.title}
                        </p>
                      )
                    })
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Please select atleast 2 tags.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={values.length < 2 || pending || !description}
              className="self-start top-20 px-8 left-0 bg-accent-green hover:bg-accent-green rounded-full focus:bg-accent-green text-black"
            >
              {pending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Publish
            </Button>
          </form>
        </CardContent>
      </Card>
    </Wrapper>
  )
}
