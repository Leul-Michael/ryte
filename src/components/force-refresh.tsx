"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

const ForceRefresh = () => {
  const router = useRouter()
  useEffect(() => {
    router.refresh()
  }, [])

  return null
}

export default ForceRefresh
