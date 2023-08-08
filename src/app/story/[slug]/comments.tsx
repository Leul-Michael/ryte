import { Button } from "@/components/ui/button"
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { fetcher } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import { useState, useTransition } from "react"
import useSWR from "swr"
import { Comment } from "../../../../types"
import CommentExcerpt from "@/components/excerpts/comment-excerpt"
import { saveComment } from "@/app/actions"
import { ScrollArea } from "@/components/ui/scroll-area"
import CommentSkeleton from "@/components/skeletons/comment-skeleton"

interface CommentsProps {
  slug: string
}

const Comments = ({ slug }: CommentsProps) => {
  const [pending, startTransition] = useTransition()
  const [comment, setComment] = useState("")
  const { data, isLoading } = useSWR(
    slug ? `/api/comment?slug=${slug}` : null,
    fetcher,
    {
      revalidateOnMount: true,
    }
  )

  return (
    <SheetContent>
      <ScrollArea className="h-[98vh] pb-8">
        <SheetHeader className="sticky top-0 left-0 bg-background z-[51] pb-2">
          <SheetTitle>Comments</SheetTitle>
          <SheetDescription>
            What do you think about the story?
          </SheetDescription>
          <form
            action={() => {
              if (comment.length < 2 || !slug) return
              startTransition(async () => {
                const res = await saveComment(comment, slug)
                console.log(res)
              })
              setComment("")
            }}
            className="flex flex-col gap-4"
          >
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-y w-full h-[100px] outline-none text-sm py-2 focus:border-border bg-transparent border-b border-border/60"
              placeholder="comment"
              maxLength={200}
            ></textarea>

            <Button
              type="submit"
              variant="outline"
              disabled={comment.length < 2 || pending}
              className="self-start px-8 rounded-full"
            >
              {pending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Add Comment
            </Button>
          </form>
        </SheetHeader>
        <div className="flex flex-col gap-2 py-4">
          {isLoading ? (
            [...Array(2).keys()].map((i) => <CommentSkeleton key={i} />)
          ) : (
            <>
              {data?.myComments?.map((comment: Comment) => (
                <CommentExcerpt key={comment.id} comment={comment} />
              ))}
              {data?.comments.map((comment: Comment) => (
                <CommentExcerpt key={comment.id} comment={comment} />
              ))}
            </>
          )}
        </div>
      </ScrollArea>
    </SheetContent>
  )
}

export default Comments
