import { useToast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useGoogleAuth() {
  const router = useRouter()
  const { toast } = useToast()

  const authenticate = async (signin_type: string) => {
    document.cookie = `signin_type=${signin_type}; path=/`

    try {
      const res = await signIn("google", { redirect: false })
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
