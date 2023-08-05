"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Error() {
  const router = useRouter()
  return (
    <div className="flex flex-col h-full min-h-[90vh] justify-center items-center text-center">
      <h1 className="font-serif text-4xl font-semibold capitalize text-accent-foreground">
        Error!
      </h1>
      <p className="text-base text-muted-foreground max-w-[500px]">
        An unexpected error occurred, and we were unable to show you this page.
        Please try again.
      </p>
      <Button
        variant="outline"
        className="rounded-full"
        onClick={() => router.refresh()}
      >
        Retry
      </Button>
    </div>
  )
}
