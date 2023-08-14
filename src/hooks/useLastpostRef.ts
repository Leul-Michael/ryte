import { useCallback, useRef } from "react"

export default function useLastPostRef(
  isLoading: boolean,
  fetchNextPage: () => void,
  hasNextPage: boolean | undefined
) {
  const intObserver = useRef<IntersectionObserver | null>(null)

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return

      if (intObserver.current) intObserver.current.disconnect()

      intObserver.current = new IntersectionObserver((elems) => {
        if (elems[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      })

      if (node) intObserver.current?.observe(node)
    },
    [fetchNextPage, hasNextPage, isLoading]
  )

  return lastPostRef
}
