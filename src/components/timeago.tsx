import { cn } from "@/lib/utils"
import { formatDistanceToNowStrict } from "date-fns"
import { parseISO } from "date-fns/fp"

type TimeagoProps = {
  timestamp: Date | string
  prefix?: string
  noprefix?: boolean
  className?: string
}

const Timeago = ({ timestamp, prefix, noprefix, className }: TimeagoProps) => {
  let time = ""
  if (timestamp) {
    const parseDate = parseISO(new Date(timestamp).toISOString())
    const timePeriod = formatDistanceToNowStrict(parseDate)

    time = prefix
      ? `${prefix} ${timePeriod} ago`
      : noprefix
      ? `${timePeriod}`
      : `Posted ${timePeriod} ago`
  }
  return (
    <p className={cn("text-xs text-muted-foreground", className ?? "")}>
      {time}
    </p>
  )
}

export default Timeago
