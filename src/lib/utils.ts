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

// get thumbnail for the story
export const getThumbnail = (
  contentJson: JSONContent | null
): {
  src: string | null
  alt?: string | null
} => {
  if (contentJson == null)
    return {
      src: null,
    }

  const firstImage = contentJson?.content?.find((c) => {
    if (c.type === "image" && c.attrs) {
      return c
    }
  })


  if (firstImage == null || firstImage.attrs == null)
    return {
      src: null,
    }

  return {
    src: firstImage.attrs.src,
    alt: firstImage.attrs.alt ?? null,
  }
}

// estimate minute read
export function readingTime(text: string) {
  const wordsPerMinute = 225
  return Math.ceil(wordCounter(text) / wordsPerMinute)
}

function wordCounter(input: string) {
  const text = input.split(/\s+/)
  let wordCount = 0
  for (let i = 0; i < text.length; i++) {
    if (text[i] !== " " && isWord(text[i])) {
      wordCount++
    }
  }
  return wordCount
}

function isWord(str: string) {
  let alphaNumericFound = false
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i)
    if (
      (code > 47 && code < 58) || // numeric (0-9)
      (code > 64 && code < 91) || // upper alpha (A-Z)
      (code > 96 && code < 123)
    ) {
      // lower alpha (a-z)
      alphaNumericFound = true
      return alphaNumericFound
    }
  }
  return alphaNumericFound
}
