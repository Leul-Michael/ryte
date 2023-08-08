import { format } from "date-fns"
import { Comment } from "../../../types"
import AvatarIcon from "../avatar"

interface CommentExcerptProps {
  comment: Comment
}

const CommentExcerpt = ({ comment }: CommentExcerptProps) => {
  return (
    <article className="flex items-start py-1 gap-4">
      <AvatarIcon
        className="h-8 w-8"
        name={comment?.user?.name ?? null}
        image={comment?.user?.image ?? null}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="text-sm font-serif">{comment?.user?.name}</span>
          <span className="text-xs text-muted-foreground">
            {comment?.created_at
              ? format(new Date(comment?.created_at), "MMM dd,yyyy")
              : null}
          </span>
        </div>
        <p className="text-sm">{comment.comment}</p>
      </div>
    </article>
  )
}

export default CommentExcerpt
