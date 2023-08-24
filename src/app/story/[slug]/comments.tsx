import { Button } from "@/components/ui/button"
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { fetcher } from "@/lib/utils"
import { Loader2, Plus } from "lucide-react"
import { useRef, useState, useTransition } from "react"
import useSWRInfinite from "swr/infinite"
import { Comment } from "../../../../types"
import CommentExcerpt from "@/components/excerpts/comment-excerpt"
import { saveComment } from "@/app/actions"
import { ScrollArea } from "@/components/ui/scroll-area"
import CommentSkeleton from "@/components/skeletons/comment-skeleton"
import { Session } from "next-auth/types"
import Link from "next/link"

interface CommentsProps {
  slug: string
  session: Pick<Session["user"], "id" | "name"> | null
}

const Comments = ({ slug, session }: CommentsProps) => {
  const commentsRef = useRef<HTMLDivElement | null>(null)
  const [pending, startTransition] = useTransition()
  const [comment, setComment] = useState("")
  const { data, isLoading, mutate, size, setSize, isValidating } =
    useSWRInfinite<{
      comments: Comment[]
      nextCursor: { id: String } | undefined
    }>((pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData?.comments?.length) return null // reached the end
      if (pageIndex === 0) return `/api/comment?slug=${slug}`

      return `/api/comment?slug=${slug}&cursor=${previousPageData.nextCursor?.id}`
    }, fetcher)

  return (
    <SheetContent className="h-screen flex flex-col">
      <SheetHeader className="pb-2">
        <SheetTitle>Comments</SheetTitle>
        {!session ? (
          <SheetDescription>Sign in to commment to the story</SheetDescription>
        ) : (
          <SheetDescription>
            What do you think about the story?
          </SheetDescription>
        )}
        {!session ? (
          <Button
            type="submit"
            variant="outline"
            className="self-start px-8 rounded-full"
            asChild
          >
            <Link href="/auth/login">Sing In</Link>
          </Button>
        ) : (
          <form
            style={{ opacity: !pending || session ? 1 : 0.7 }}
            action={() => {
              if (comment.length < 2 || !slug || !session) return
              startTransition(async () => {
                await saveComment(comment, slug)
                mutate()
              })
              setComment("")
              commentsRef.current?.scrollIntoView({
                block: "end",
                behavior: "smooth",
              })
            }}
            className="flex flex-col gap-4"
          >
            <textarea
              disabled={pending}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-y w-full h-[100px] outline-none text-sm py-2 focus:border-border bg-transparent border-b border-border/60"
              placeholder="comment"
              maxLength={200}
            ></textarea>

            <Button
              type="submit"
              variant="outline"
              disabled={comment.length < 2 || pending || !session}
              className="self-start px-8 rounded-full"
            >
              {pending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Add Comment
            </Button>
          </form>
        )}
      </SheetHeader>
      <ScrollArea ref={commentsRef} className="h-full">
        <div className="flex flex-col gap-2">
          {isLoading
            ? [...Array(2).keys()].map((i) => <CommentSkeleton key={i} />)
            : data?.map((v, i) => {
                return v.comments.length > 0 ? (
                  v?.comments?.map((comment: Comment) => (
                    <CommentExcerpt key={comment.id} comment={comment} />
                  ))
                ) : (
                  <p key={i} className="text-xs text-muted-foreground">
                    Be the first to comment on the story.
                  </p>
                )
              })}
          {isValidating ? <CommentSkeleton /> : null}
          {data?.find((v, i) => {
            if (data.length - 1 === i) return v.nextCursor
          }) ? (
            <Button
              disabled={isLoading || isValidating}
              variant="outline"
              onClick={() => setSize(size + 1)}
              className="mx-auto group mb-1 rounded-full w-[35px] h-[35px] p-0"
            >
              <Plus size={20} className="opacity-70 group-hover:opacity-100" />
            </Button>
          ) : null}
        </div>
      </ScrollArea>
    </SheetContent>
  )
}

export default Comments
