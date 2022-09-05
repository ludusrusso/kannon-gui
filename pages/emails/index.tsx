import { useRef } from "react";

import dynamic from "next/dynamic";

const EmailEditor = dynamic(() => import("react-email-editor"), {
  ssr: false,
}) as any;

const EmailPage = () => {
  const emailEditorRef = useRef<any>(null);

  const exportHtml = () => {
    if (!emailEditorRef.current) {
      return;
    }
    const editor = (emailEditorRef.current as any).editor;
    console.log(editor);
    editor.exportHtml((data: any) => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };

  return (
    <div>
      <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>

      <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      <p>Ciao</p>
    </div>
  );
};

export default EmailPage;
