import { create } from "zustand"

interface ContentStore {
  title: string
  setTitle: (input: string) => void
  content: string
  setContent: (input: string) => void
}

const useStoryStore = create<ContentStore>((set) => ({
  title: "",
  setTitle: (input) => set(() => ({ title: input })),
  content: "",
  setContent: (input) => set(() => ({ content: input })),
}))

export const useTitle = () => useStoryStore((state) => state.title)
export const useSetTitle = () => useStoryStore((state) => state.setTitle)
export const useContent = () => useStoryStore((state) => state.content)
export const useSetContent = () => useStoryStore((state) => state.setContent)
