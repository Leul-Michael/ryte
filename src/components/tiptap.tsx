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
import TextAlign from "@tiptap/extension-text-align"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import Youtube from "@tiptap/extension-youtube"

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
  AlignLeft,
  AlignCenter,
  AlignRight,
  Code2,
  YoutubeIcon,
  Braces,
} from "lucide-react"
import { Dispatch, SetStateAction, useCallback } from "react"
import { Skeleton } from "./ui/skeleton"
import {
  useSetContentJson,
  useSetShowEditorImgModal,
  useShowEditorImgModal,
} from "@/store/zustand"
import TiptapImageModal from "./tiptap-image-modal"
import css from "highlight.js/lib/languages/css"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import html from "highlight.js/lib/languages/xml"
// load all highlight.js languages
import { lowlight } from "lowlight/lib/core"

lowlight.registerLanguage("html", html)
lowlight.registerLanguage("css", css)
lowlight.registerLanguage("js", js)
lowlight.registerLanguage("ts", ts)

interface TiptapProps {
  content: string
  setContent: Dispatch<SetStateAction<string>>
}

const Tiptap = ({ content, setContent }: TiptapProps) => {
  const setContentJson = useSetContentJson()
  const showImageModal = useShowEditorImgModal()
  const setShowImageModal = useSetShowEditorImgModal()

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
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Youtube.configure({
        controls: false,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "p-2 md:p-4 flex flex-col w-full focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor?.getHTML())
      setContentJson(editor?.getJSON())
    },
  })

  const onImgaeSelect = useCallback(
    (src: string, alt: string) => {
      if (!editor) return
      editor.chain().focus().setImage({ src, alt }).run()
    },
    [editor]
  )

  return (
    <>
      {showImageModal
        ? editor && (
            <TiptapImageModal
              show={showImageModal}
              setShow={setShowImageModal}
              onSelect={onImgaeSelect}
            />
          )
        : null}
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
    </>
  )
}

export default Tiptap

const FloatingMenuOptions = ({ editor }: { editor: Editor }) => {
  const showImageModal = useShowEditorImgModal()

  return (
    <FloatingMenu
      className="flex z-[49] flex-wrap items-stretch gap-2 bg-background rounded-[4px] p-1 max-w-[400px]"
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      {!showImageModal && <Buttons editor={editor} />}
    </FloatingMenu>
  )
}

const BubbleMenuOptions = ({ editor }: { editor: Editor }) => {
  const showImageModal = useShowEditorImgModal()

  return (
    <BubbleMenu
      className="flex z-[49] flex-wrap items-stretch gap-2 bg-background rounded-[4px] p-1 max-w-[400px]"
      editor={editor}
      tippyOptions={{ duration: 100 }}
    >
      {!showImageModal && <Buttons editor={editor} bubble />}
    </BubbleMenu>
  )
}

const Buttons = ({ editor, bubble }: { editor: Editor; bubble?: boolean }) => {
  const setShowImageModal = useSetShowEditorImgModal()

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

  const addImage = () => {
    setShowImageModal(true)
  }

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL")

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        height: 480,
      })
    }
  }

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
      <button
        title="link youtube video"
        onClick={(e) => {
          e.preventDefault()
          addYoutubeVideo()
        }}
        className={`rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
      >
        <YoutubeIcon size={15} />
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
            title="align left"
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().setTextAlign("left").run()
            }}
            className={`${
              editor.isActive({ textAlign: "left" }) ? "bg-muted" : ""
            } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
          >
            <AlignLeft size={15} />
          </button>
          <button
            title="align center"
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().setTextAlign("center").run()
            }}
            className={`${
              editor.isActive({ textAlign: "center" }) ? "bg-muted" : ""
            } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
          >
            <AlignCenter size={15} />
          </button>
          <button
            title="align right"
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().setTextAlign("right").run()
            }}
            className={`${
              editor.isActive({ textAlign: "right" }) ? "bg-muted" : ""
            } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
          >
            <AlignRight size={15} />
          </button>
          <button
            title="code"
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleCode().run()
            }}
            className={`${
              editor.isActive("code") ? "bg-muted" : ""
            } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
          >
            <Code2 size={15} />
          </button>
          <button
            title="code block"
            onClick={(e) => {
              e.preventDefault()
              editor.chain().focus().toggleCodeBlock().run()
            }}
            className={`${
              editor.isActive("codeBlock") ? "bg-muted" : ""
            } rounded-[4px] border border-border px-[0.35rem] py-1 min-h-[32.5px]`}
          >
            <Braces size={15} />
          </button>
          <button
            title="horizontal line"
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
