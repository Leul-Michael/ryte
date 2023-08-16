import { JSONContent } from "@tiptap/react"
import { create } from "zustand"

interface ContentStore {
  search: string
  setSearch: (input: string) => void
  showEditorImgModal: boolean
  setShowEditorImgModal: (input: boolean) => void
  storyThumbnail: {
    src: string
    alt: string
    in_content: boolean
  }
  setStoryThumbnail: (input: {
    src: string
    alt: string
    in_content: boolean
  }) => void
  contentJson: JSONContent | null
  setContentJson: (input: JSONContent | null) => void
}

const useStoryStore = create<ContentStore>((set) => ({
  search: "",
  setSearch: (input) => set(() => ({ search: input })),
  showEditorImgModal: false,
  setShowEditorImgModal: (input) => set(() => ({ showEditorImgModal: input })),
  storyThumbnail: {
    src: "",
    alt: "",
    in_content: false,
  },
  setStoryThumbnail: (input) => set(() => ({ storyThumbnail: input })),
  contentJson: null,
  setContentJson: (input) => set(() => ({ contentJson: input })),
}))

export const useSearch = () => useStoryStore((state) => state.search)
export const useSetSearch = () => useStoryStore((state) => state.setSearch)
export const useShowEditorImgModal = () =>
  useStoryStore((state) => state.showEditorImgModal)
export const useSetShowEditorImgModal = () =>
  useStoryStore((state) => state.setShowEditorImgModal)
export const useStoryThumbnail = () =>
  useStoryStore((state) => state.storyThumbnail)
export const useSetStoryThumbnail = () =>
  useStoryStore((state) => state.setStoryThumbnail)
export const useContentJson = () => useStoryStore((state) => state.contentJson)
export const useSetContentJson = () =>
  useStoryStore((state) => state.setContentJson)
