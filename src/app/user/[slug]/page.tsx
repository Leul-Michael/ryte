import { auth } from "@/lib/auth"
import Image from "next/image"
import prisma from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AvatarIcon from "@/components/avatar"
import { formatNumber } from "@/lib/utils"
import { Calendar, Mail, MapPin } from "lucide-react"
import { format } from "date-fns"
import UserStories from "./user-stories"
import FollowButton from "./follow-button"
import { Metadata } from "next"

async function getUser(username: string) {
  const session = await auth()
  const userId = session?.user?.id as string

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      username: true,
      _count: {
        select: { followers: true, stories: true, follows: true },
      },
      followers:
        userId == null
          ? false
          : {
              where: {
                id: userId,
              },
            },
      created_at: true,
    },
  })

  if (!user) return null

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    bio: user.bio,
    username: user.username,
    followers: user._count.followers,
    follows: user._count.follows,
    stories: user._count.stories,
    isAuthor: user.id === session?.user?.id,
    followedByMe: user.followers?.length > 0,
    created_at: user.created_at,
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const user = await getUser(decodeURIComponent(params.slug))

  if (!user) return {}

  return {
    title: user.name,
    description: user.bio,
  }
}

export default async function UserPage({
  params,
}: {
  params: { slug: string }
}) {
  const user = await getUser(decodeURIComponent(params.slug))

  if (!user) {
    return (
      <section className="flex h-full flex-col max-w-screen-md mx-auto pt-12 pb-20 min-h-[90vh] gap-4 w-full">
        <h1 className="text-5xl font-serif font-semibold leading-none">
          User not found!
        </h1>
        <p className="text-[1.35rem] max-w-[90%] text-muted-foreground">
          Discover stories by exploring homepage.
        </p>
        <Button
          asChild
          type="submit"
          variant="outline"
          className="self-start px-8 rounded-full"
        >
          <Link href="/">Go Home</Link>
        </Button>
      </section>
    )
  }

  return (
    <section className="relative flex h-full flex-col min-h-[90vh] w-full pb-10">
      <div className="w-full h-full flex flex-col flex-1 gap-8 py-4">
        <div className="relative flex max-h-[350px] min-h-[40vh] h-full w-full overflow-hidden rounded-[10px] md:rounded-[20px] sm:min-h-[35vh] md:min-h-[40vh] lg:min-h-[300px]">
          <Image
            src="/profile-bg.jpg"
            alt="cover picture"
            fill
            sizes="100vw"
            className="bg-border/40 object-cover"
          />
        </div>
        <div className="flex md:flex-row flex-col md:items-start gap-4 max-w-[900px] px-3 mx-auto w-full">
          <div className="relative flex md:w-32 h-4 w-20">
            <AvatarIcon
              className="absolute border-[3px] border-background -top-12 md:-top-14 left-0 md:w-28 md:h-28 w-16 h-16"
              name={user.name}
              image={user.image}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center gap-4 flex-wrap">
              <h1 className="text-4xl md:text-5xl font-serif font-semibold leading-[1.1]">
                {user.name}
              </h1>
              {user.isAuthor ? (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full  py-2 h-auto text-xs"
                >
                  <Link href={`/profile/${user.username}?tab=overview`}>
                    Profile
                  </Link>
                </Button>
              ) : (
                <FollowButton
                  userId={user.id}
                  username={user.username}
                  followedByMe={user.followedByMe}
                />
              )}
            </div>
            <span className="flex items-center gap-2 text-[0.6rem] text-muted-foreground">
              <span>Followers {formatNumber(user.followers)}</span>
              <span>Following {formatNumber(user.follows)}</span>
            </span>
            <div className="flex items-center flex-wrap gap-4">
              <span className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                Joined {format(new Date(user.created_at), "MMM dd, yyyy")}
              </span>
              <span className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                {user.email}
              </span>
              <span className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                Addis Ababa
              </span>
            </div>
            <div className="flex flex-col gap-1 py-4">
              <span className="text-muted-foreground text-sm">Bio</span>
              <p className="max-w-[600px]">{user.bio}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-start gap-4 max-w-[900px] px-3 mx-auto w-full py-8">
          <span className="md:w-32 w-20 text-muted-foreground md:py-6">
            Stories
          </span>
          {user.id ? <UserStories userId={user.id} /> : null}
        </div>
      </div>
    </section>
  )
}
