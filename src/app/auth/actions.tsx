import { useToast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect } from "react"

export function useGoogleAuth() {
  const router = useRouter()
  const { toast } = useToast()

  const authenticate = async (signin_type: string) => {
    document.cookie = `signin_type=${signin_type}; path=/`

    try {
      const res = await signIn("google", {
        callbackUrl: "http://localhost:3000/auth/login",
      })
      if (res) {
        router.push("/")
      }
    } catch (e) {
      console.log("from google catch", e)
      toast({
        title: "Something went wrong, try again!",
        variant: "destructive",
      })
    }
  }

  return [authenticate]
}

export function useGithubAuth() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get("error") ?? null
  const { toast } = useToast()

  const showErrorMsg = useCallback(
    (error: string) => {
      switch (error) {
        case "CallbackRouteError": {
          toast({
            title:
              "Another account already exists with the same e-mail address.",
            variant: "destructive",
          })
          break
        }
      }
    },
    [toast]
  )

  useEffect(() => {
    if (error) showErrorMsg(error)
  }, [error, showErrorMsg])

  const authenticate = async () => {
    try {
      const res = await signIn("github")

      if (res) {
        router.push("/")
      }
    } catch (e) {
      console.log("from github catch", e)
      toast({
        title: "Something went wrong, try again!",
        variant: "destructive",
      })
    }
  }

  return [authenticate]
}
