"use client"

import {
  useEditor,
  EditorContent,
  FloatingMenu,
  Editor,
  BubbleMenu,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Typography from "@tiptap/extension-typography"
import Placeholder from "@tiptap/extension-placeholder"
import LinkExtenstion from "@tiptap/extension-link"
import ImageExtenstion from "@tiptap/extension-image"
import UnderlineExtenstion from "@tiptap/extension-underline"

import {
  Bold,
  Italic,
  Link,
  List,
  Quote,
  Unlink,
  Image as ImageIcon,
  Underline,
  ListOrdered,
  Spline,
} from "lucide-react"
import { useContent, useSetContent } from "@/store/zustand"
import { useCallback } from "react"
import { Skeleton } from "./ui/skeleton"

const Tiptap = () => {
  const content = useContent()
  const setContent = useSetContent()
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Placeholder.configure({
        placeholder: "Your story…",
      }),
      LinkExtenstion.configure({
        protocols: ["ftp", "mailto"],
        validate: (href) => /^https?:\/\//.test(href),
      }),
      ImageExtenstion,
      UnderlineExtenstion,
    ],
    content,
    editorProps: {
      attributes: {
        class: "p-2 md:p-4 flex flex-col w-full focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor?.getHTML())
    },
  })

  return (
    <div className="tiptap flex flex-col w-full">
      {editor && <FloatingMenuOptions editor={editor} />}
      {editor && <BubbleMenuOptions editor={editor} />}
      {!editor ? (
        <Skeleton className="w-full h-[30px] rounded-full my-4" />
      ) : (
        <EditorContent
          className="w-full flex flex-col gap-4 min-h-[40vh] rounded-sm"
          editor={editor}
        />
      )}
    </div>
  )
}

export default Tiptap

const FloatingMenuOptions = ({ editor }: { editor: Editor }) => {
  return (
    <FloatingMenu
      className="flex flex-wrap items-stretch gap-2 bg-background rounded-[4px] p-1 max-w-[400px]"
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      <Buttons editor={editor} />
    </FloatingMenu>
  )
}

const BubbleMenuOptions = ({ editor }: { editor: Editor }) => {
  return (
    <BubbleMenu
      className="flex flex-wrap items-stretch gap-2 bg-background rounded-[4px] p-1 max-w-[400px]"
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      <Buttons editor={editor} bubble />
    </BubbleMenu>
  )
}

const Buttons = ({ editor, bubble }: { editor: Editor; bubble?: boolean }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("URL", previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  const addImage = useCallback(() => {
    const url = window.prompt("URL")

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleBold().run()
        }}
        className={`${
          editor.isActive("bold") ? "bg-muted" : ""
        } texts rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
      >
        <Bold size={15} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleItalic().run()
        }}
        className={`${
          editor.isActive("italic") ? "bg-muted" : ""
        } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
      >
        <Italic size={15} />
      </button>
      {bubble ? (
        <button
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleUnderline().run()
          }}
          className={`${
            editor.isActive("underline") ? "bg-muted" : ""
          } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
        >
          <Underline size={15} />
        </button>
      ) : null}
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }}
        className={`${
          editor.isActive("heading", { level: 1 }) ? "bg-muted" : ""
        } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px] text-sm`}
      >
        h1
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }}
        className={`${
          editor.isActive("heading", { level: 2 }) ? "bg-muted" : ""
        } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px] text-sm`}
      >
        h2
      </button>
      {bubble ? (
        <button
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }}
          className={`${
            editor.isActive("heading", { level: 3 }) ? "bg-muted" : ""
          } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px] text-sm`}
        >
          h3
        </button>
      ) : null}
      <button
        onClick={(e) => {
          e.preventDefault()
          addImage()
        }}
        className={`rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
      >
        <ImageIcon size={15} />
      </button>
      {bubble && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault()
              setLink()
            }}
            className={`${
              editor.isActive("link") ? "bg-muted" : ""
            } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
          >
            <Link size={15} />
          </button>
          {editor.isActive("link") && (
            <button
              onClick={(e) => {
                e.preventDefault()
                editor.chain().focus().unsetLink().run()
              }}
              className={`rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
              disabled={!editor.isActive("link")}
            >
              <Unlink size={15} />
            </button>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleBlockquote().run()
            }}
            className={`${
              editor.isActive("blockquote") ? "bg-muted" : ""
            } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
          >
            <Quote size={15} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleBulletList().run()
            }}
            className={`${
              editor.isActive("list-item") ? "bg-muted" : ""
            } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
          >
            <List size={15} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleOrderedList().run()
            }}
            className={`${
              editor.isActive("orderedList") ? "bg-muted" : ""
            } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
          >
            <ListOrdered size={15} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().setHorizontalRule().run()
            }}
            className={`rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
          >
            <Spline size={15} />
          </button>
        </>
      )}
    </>
  )
}
