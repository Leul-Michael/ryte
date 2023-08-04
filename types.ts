export interface User {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  role: string
}

export interface Tag {
  id: string
  title: string
  ct: string[]
  followers?: number
  stories?: number
  followedByMe?: boolean
  updated_at: Date
  created_at: Date
}
