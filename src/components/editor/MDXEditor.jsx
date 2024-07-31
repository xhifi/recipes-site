"use client";

import debounce from "@/app/utils/debounce";
import {
  MDXEditor,
  headingsPlugin,
  toolbarPlugin,
  thematicBreakPlugin,
  tablePlugin,
  linkPlugin,
  linkDialogPlugin,
  listsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  KitchenSinkToolbar,
  frontmatterPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  imagePlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
} from "@mdxeditor/editor";

const Editor = ({ markdown, editorRef, handleSave, id }) => {
  return (
    <MDXEditor
      className=""
      contentEditableClassName="prose h-full  min-w-full"
      ref={editorRef}
      markdown={markdown}
      onChange={debounce(async (update) => {
        await handleSave(id, update);
      }, 1000)}
      plugins={[
        toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        frontmatterPlugin(),
        directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
        codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
        codeMirrorPlugin({ codeBlockLanguages: { js: "JavaScript", css: "CSS", txt: "text", tsx: "TypeScript" } }),
        markdownShortcutPlugin(),
        diffSourcePlugin({
          diffMarkdown: markdown,
          viewMode: "rich-text",
          readOnlyDiff: true,
        }),
      ]}
    />
  );
};

export default Editor;
