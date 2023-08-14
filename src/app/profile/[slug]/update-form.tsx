"use client"

import { Input } from "@/components/ui/input"
import { User } from "../../../../types"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { updateprofile } from "@/app/actions"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

type UpdateFormProps = {
  user: User & {
    username: string
    status: "ACTIVE" | "BLOCKED"
    followers: number
    follows: number
    stories: number
    followedByMe: boolean
    location: any
    socials: any
  }
}

const profileSchema = z.object({
  name: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  bio: z.string(),
  city: z.string().nonempty("City is required"),
  country: z.string().nonempty("Country is required"),
  instagram: z.union([z.literal(""), z.string().trim().url()]),
  github: z.union([z.literal(""), z.string().trim().url()]),
})

const UpdateForm = ({ user }: UpdateFormProps) => {
  const { toast } = useToast()
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name ?? "",
      bio: user.bio ?? "",
      city: user.location?.city ?? "",
      country: user.location?.country ?? "",
      instagram: user.socials?.instagram ?? "",
      github: user.socials?.github ?? "",
    },
  })

  async function onSubmit({
    city,
    country,
    instagram,
    github,
    ...rest
  }: z.infer<typeof profileSchema>) {
    let socials:
      | {
          instagram: string
          github: string
        }
      | undefined = undefined
    let location = {
      city,
      country,
    }
    if (instagram || github) {
      socials = {
        github: github ?? null,
        instagram: instagram ?? null,
      }
    }

    startTransition(async () => {
      const res = await updateprofile({ ...rest, socials, location })
      toast({
        variant: res.success ? "default" : "destructive",
        title: res.message,
      })
    })

    router.refresh()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 py-8 max-w-[600px] w-full"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm text-muted-foreground">Name</label>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 flex-col md:flex-row w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <label className="text-sm text-muted-foreground">Username</label>
            <Input
              placeholder="username"
              disabled
              defaultValue={user.username}
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label className="text-sm text-muted-foreground">Email</label>
            <Input
              placeholder="email"
              defaultValue={user.email ?? ""}
              disabled
            />
          </div>
        </div>
        <div className="flex gap-2 flex-col md:flex-row w-full">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <textarea
                    className="resize-y w-full h-[150px] focus-visible:ring-2 ring-offset-background focus-visible:ring-ring focus-visible:ring-offset-2 outline-none text-sm bg-transparent rounded-sm border p-4 border-border"
                    placeholder="tell us about your self, work, hobbies..."
                    maxLength={300}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2 flex-col md:flex-row w-full">
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="instagram" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Github</FormLabel>
                <FormControl>
                  <Input placeholder="github" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={pending}
          className="self-start px-8 my-4 bg-accent-green hover:bg-accent-green rounded-full focus:bg-accent-green text-black"
        >
          {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Update
        </Button>
      </form>
    </Form>
  )
}

export default UpdateForm
