"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useGithubAuth, useGoogleAuth } from "../actions"
import { Github } from "lucide-react"
import { useSearchParams } from "next/navigation"

const AuthForm = () => {
  const searchParams = useSearchParams()
  const error = searchParams.get("error") ?? null
  const [loginWithGoogle] = useGoogleAuth()
  const [loginWithGithub] = useGithubAuth()

  async function handleGoogleLogin() {
    await loginWithGoogle("login")
  }

  async function handleGithubLogin() {
    await loginWithGithub()
  }

  return (
    <>
      <div className="flex flex-col gap-6 w-full justify-center items-center py-20">
        <div className="flex flex-col w-full gap-2">
          <h1 className="font-serif text-2xl font-bold uppercase">Join Us</h1>
          <p className="text-muted-foreground max-w-[400px] py-4 leading-[1.3]">
            Welcome to Ryte, please select a method below to continue!
          </p>
        </div>
        <div className="w-full space-y-2">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="py-6 text-muted-foreground w-full max-w-[400px]"
          >
            <Image
              width={50}
              height={50}
              src="/google.png"
              alt="google logo"
              className="mr-4 h-4 w-4"
            />
            Continue using Google
          </Button>
        </div>
        <div className="w-full space-y-2">
          <Button
            onClick={handleGithubLogin}
            disabled
            variant="outline"
            className="py-6 text-muted-foreground w-full max-w-[400px]"
          >
            <Github className="h-4 w-4 mr-4" />
            Continue using Github
          </Button>
        </div>
      </div>
    </>
  )
}

export default AuthForm
