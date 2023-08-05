import { JSONContent } from "@tiptap/react"
import { create } from "zustand"

interface ContentStore {
  contentJson: JSONContent | null
  setContentJson: (input: JSONContent) => void
}

const useStoryStore = create<ContentStore>((set) => ({
  contentJson: null,
  setContentJson: (input) => set(() => ({ contentJson: input })),
}))

export const useContentJson = () => useStoryStore((state) => state.contentJson)
export const useSetContentJson = () =>
  useStoryStore((state) => state.setContentJson)
