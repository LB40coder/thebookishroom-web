"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useCallback, useEffect } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading2,
  Heading3,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo,
} from "lucide-react";
import { MediaPicker } from "./MediaPicker";
import { useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: string;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`p-1.5 rounded-sm transition-colors ${
        active
          ? "bg-forest text-cream"
          : "text-coffee hover:bg-cream-dark hover:text-ink"
      } disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content...",
  minHeight = 420,
  maxHeight = "calc(100vh - 12rem)",
}: RichTextEditorProps) {
  const [mediaOpen, setMediaOpen] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({ HTMLAttributes: { class: "rounded-sm" } }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose-studio px-4 py-3 focus:outline-none text-sm text-ink min-h-full",
        style: `min-height: ${minHeight}px`,
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const insertImage = useCallback(
    (url: string) => {
      editor?.chain().focus().setImage({ src: url }).run();
    },
    [editor]
  );

  if (!editor) return null;

  return (
    <div
      className="flex flex-col border border-coffee/20 rounded-sm bg-cream overflow-hidden"
      style={{ maxHeight }}
    >
      <div className="sticky top-0 z-10 shrink-0 flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-coffee/10 bg-cream-dark/95 backdrop-blur-sm">
        <ToolbarButton
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          <UnderlineIcon className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        >
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-5 bg-coffee/20 mx-1" />

        <ToolbarButton
          title="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
        >
          <Heading3 className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-5 bg-coffee/20 mx-1" />

        <ToolbarButton
          title="Bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Numbered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Quote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          <Quote className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-5 bg-coffee/20 mx-1" />

        <ToolbarButton
          title="Align left"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
        >
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Align center"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
        >
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Align right"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
        >
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-5 bg-coffee/20 mx-1" />

        <ToolbarButton title="Link" onClick={setLink} active={editor.isActive("link")}>
          <Link2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton title="Insert image" onClick={() => setMediaOpen(true)}>
          <ImageIcon className="w-4 h-4" />
        </ToolbarButton>

        <span className="w-px h-5 bg-coffee/20 mx-1" />

        <ToolbarButton
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="w-4 h-4" />
        </ToolbarButton>
      </div>

      <div className="overflow-y-auto flex-1 min-h-0">
        <EditorContent editor={editor} />
      </div>

      <MediaPicker
        open={mediaOpen}
        onClose={() => setMediaOpen(false)}
        onSelect={(url) => {
          insertImage(url);
          setMediaOpen(false);
        }}
      />
    </div>
  );
}
