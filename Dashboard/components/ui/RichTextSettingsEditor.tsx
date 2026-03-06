"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  Bold,
  Italic,
  List,
  ListOrdered,
  Underline,
  UploadCloud,
} from "lucide-react";
import { useRouter } from "next/navigation";

type ToolbarAction = {
  id: string;
  label: string;
  command: string;
  icon: React.ComponentType<{ size?: number }>;
};

type RichTextSettingsEditorProps = {
  title: string;
  initialHtml: string;
  backHref?: string;
  saveLabel?: string;
  uploadHint?: string;
  defaultFontSize?: string;
  onSave?: (content: string) => void;
};

const toolbarActions: ToolbarAction[] = [
  { id: "bold", label: "Bold", command: "bold", icon: Bold },
  { id: "italic", label: "Italic", command: "italic", icon: Italic },
  {
    id: "underline",
    label: "Underline",
    command: "underline",
    icon: Underline,
  },
  { id: "left", label: "Align left", command: "justifyLeft", icon: AlignLeft },
  {
    id: "center",
    label: "Align center",
    command: "justifyCenter",
    icon: AlignCenter,
  },
  {
    id: "right",
    label: "Align right",
    command: "justifyRight",
    icon: AlignRight,
  },
  {
    id: "ordered-list",
    label: "Ordered list",
    command: "insertOrderedList",
    icon: ListOrdered,
  },
  {
    id: "unordered-list",
    label: "Bullet list",
    command: "insertUnorderedList",
    icon: List,
  },
];

const fontSizes = [
  { label: "12", value: "12" },
  { label: "14", value: "14" },
  { label: "16", value: "16" },
  { label: "18", value: "18" },
  { label: "20", value: "20" },
  { label: "24", value: "24" },
];

export default function RichTextSettingsEditor({
  title,
  initialHtml,
  backHref = "/dashboard/settings",
  saveLabel = "Save",
  uploadHint = "jpg/png - Max. 5MB",
  defaultFontSize = "24",
  onSave,
}: RichTextSettingsEditorProps) {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const [fontSizeValue, setFontSizeValue] = useState(defaultFontSize);
  const [uploadLabel, setUploadLabel] = useState(uploadHint);

  useEffect(() => {
    if (!editorRef.current) return;
    editorRef.current.innerHTML = initialHtml;
  }, [initialHtml]);

  useEffect(() => {
    setUploadLabel(uploadHint);
  }, [uploadHint]);

  const applyCommand = (command: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadLabel(file.name);
  };

  const handleSave = () => {
    const content = editorRef.current?.innerHTML ?? "";

    if (onSave) {
      onSave(content);
      return;
    }

    console.log(`${title} saved:`, content);
  };

  return (
    <div className="w-full">
      <div className="h-[calc(100vh-7.4rem)] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col">
        <div className="bg-main px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push(backHref)}
            className="inline-flex items-center gap-3 text-white"
          >
            <ArrowLeft size={24} />
            <h1 className="text-3xl font-bold leading-none tracking-tight">
              {title}
            </h1>
          </button>

          <button
            onClick={handleSave}
            className="rounded-md bg-white px-6 py-1.5 text-base font-semibold text-main transition-colors hover:bg-orange-50"
          >
            {saveLabel}
          </button>
        </div>

        <div className="min-h-0 flex-1 p-6">
          <div className="h-full rounded-xl border border-gray-200 bg-[#f5f5f5] p-6 flex flex-col">
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              className="min-h-0 max-h-[calc(100vh-22rem)] flex-1 overflow-y-auto leading-normal text-[#515151] outline-none [&_ul]:list-disc [&_ul]:pl-8 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-8 [&_ol]:my-3 [&_li]:my-1"
              style={{ fontSize: `${fontSizeValue}px` }}
            />

            <div className="mt-5 border-t border-gray-200 pt-4 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-wrap items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-[#ececec] text-[#8b8b8b] flex items-center justify-center">
                  <UploadCloud size={18} />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#0f172a]">
                    Upload your image
                  </p>
                  <p className="text-xs text-[#94a3b8]">{uploadLabel}</p>
                </div>
                <label className="cursor-pointer rounded bg-main px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                  Upload
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex flex-wrap items-center gap-1">
                <select
                  value={fontSizeValue}
                  onChange={(event) => {
                    setFontSizeValue(event.target.value);
                  }}
                  className="h-8 rounded border border-gray-300 bg-white px-2 text-xs text-[#64748b] outline-none"
                >
                  {fontSizes.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>

                {toolbarActions.map((action) => {
                  const Icon = action.icon;

                  return (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => applyCommand(action.command)}
                      aria-label={action.label}
                      className="h-8 w-8 rounded border border-gray-300 bg-white text-main flex items-center justify-center transition-colors hover:bg-orange-50"
                    >
                      <Icon size={14} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
