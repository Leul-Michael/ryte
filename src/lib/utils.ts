import { JSONContent } from "@tiptap/react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(value: string) {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

// Swr
export const fetcher = (url: string) => fetch(url).then((r) => r.json())

// get description for the story
export const getDescription = (contentJson: JSONContent | null): string => {
  if (contentJson == null) return ""

  const firstParagraph = contentJson?.content?.find((c) => {
    if (c.type === "paragraph" && c.content) {
      return c
    }
  })

  if (firstParagraph == null || firstParagraph.content == null) return ""

  return firstParagraph.content[0].text ?? ""
}
