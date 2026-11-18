// src/components/admin/BlogEditor.jsx
//
// CKEditor 5 (free, open-source GPL build) rich-text editor.
// Images pasted / dragged / inserted with the toolbar image button are
// uploaded to ImageKit and the ImageKit URL is stored in the content.
import { useMemo } from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Alignment,
  AutoLink,
  Autoformat,
  Bold,
  BlockQuote,
  ClassicEditor,
  Essentials,
  Heading,
  HorizontalLine,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  Italic,
  Link,
  LinkImage,
  List,
  Paragraph,
  PasteFromOffice,
  Strikethrough,
  Table,
  TableToolbar,
  Underline,
  Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import "@/styles/blog-content.css";

import { uploadImageToImageKit } from "@/lib/imagekitUpload";

// Tells CKEditor how to upload an image: send it to ImageKit.
class ImageKitUploadAdapter {
  constructor(loader, folder) {
    this.loader = loader;
    this.folder = folder;
    this.controller = null;
  }

  async upload() {
    const file = await this.loader.file;
    this.controller = new AbortController();

    const url = await uploadImageToImageKit(file, {
      folder: this.folder,
      abortSignal: this.controller.signal,
      onProgress: (percent) => {
        this.loader.uploadTotal = 100;
        this.loader.uploaded = percent;
      },
    });

    return { default: url };
  }

  abort() {
    this.controller?.abort();
  }
}

// Builds the CKEditor plugin that uploads images into the given ImageKit folder.
function createImageKitUploadPlugin(folder) {
  return function ImageKitUploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
      new ImageKitUploadAdapter(loader, folder);
  };
}

const baseEditorConfig = {
  licenseKey: "GPL",
  plugins: [
    Essentials,
    Paragraph,
    Heading,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Link,
    AutoLink,
    List,
    Indent,
    Alignment,
    BlockQuote,
    HorizontalLine,
    Table,
    TableToolbar,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    LinkImage,
    Autoformat,
    PasteFromOffice,
    Undo,
  ],
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "link",
      "uploadImage",
      "insertTable",
      "blockQuote",
      "horizontalLine",
      "|",
      "bulletedList",
      "numberedList",
      "outdent",
      "indent",
      "|",
      "alignment",
    ],
    shouldNotGroupWhenFull: true,
  },
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
      { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
      { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
    ],
  },
  image: {
    toolbar: [
      "toggleImageCaption",
      "imageTextAlternative",
      "|",
      "imageStyle:inline",
      "imageStyle:block",
      "imageStyle:side",
      "|",
      "resizeImage",
      "linkImage",
    ],
  },
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: "https://",
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
};

function BlogEditor({
  initialValue = "",
  onChange,
  disabled = false,
  uploadFolder = "/allgeo-solutions/blogs/content",
  placeholder = "Write your content here...",
}) {
  const config = useMemo(
    () => ({
      ...baseEditorConfig,
      extraPlugins: [createImageKitUploadPlugin(uploadFolder)],
      placeholder,
    }),
    [uploadFolder, placeholder],
  );

  return (
    <div className="blog-editor">
      <CKEditor
        editor={ClassicEditor}
        config={config}
        data={initialValue}
        disabled={disabled}
        onChange={(_event, editor) => onChange?.(editor.getData())}
      />
    </div>
  );
}

export default BlogEditor;