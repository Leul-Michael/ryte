export interface User {
  id: string
  name: string | null
  email: string | null
  image: string | null
  username: string
  bio: string | null
}

export interface Story {
  id: string
  title: string
  description: any
  thumbnail?: any
  content: string
  user: User
  tags: Tag[]
  slug: string
  userId: string
  min_read: number
  updated_at: string
  created_at: string
}

export interface Comment {
  id: string
  comment: string
  user: User
  storyId: string
  updated_at: Date
  created_at: Date
}

export interface StoryDescription {
  text: string
  in_content: boolean
}

export interface StoryImage {
  src: string
  alt: string
  in_content: boolean
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
