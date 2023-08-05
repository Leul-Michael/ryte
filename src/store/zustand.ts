import { JSONContent } from "@tiptap/react"
import { create } from "zustand"

interface ContentStore {
  showEditorImgModal: boolean
  setShowEditorImgModal: (input: boolean) => void
  contentJson: JSONContent | null
  setContentJson: (input: JSONContent) => void
}

const useStoryStore = create<ContentStore>((set) => ({
  showEditorImgModal: false,
  setShowEditorImgModal: (input) => set(() => ({ showEditorImgModal: input })),
  contentJson: null,
  setContentJson: (input) => set(() => ({ contentJson: input })),
}))

export const useShowEditorImgModal = () =>
  useStoryStore((state) => state.showEditorImgModal)
export const useSetShowEditorImgModal = () =>
  useStoryStore((state) => state.setShowEditorImgModal)
export const useContentJson = () => useStoryStore((state) => state.contentJson)
export const useSetContentJson = () =>
  useStoryStore((state) => state.setContentJson)
