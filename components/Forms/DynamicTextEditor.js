import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

// import "react-quill/dist/quill.snow.css";

function DynamicTextEditor(props) {


// const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

  const modules = useMemo(() => {
    return {
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        [{ align: [] }],
      ],
    };
  });

  return (
    <>
      <ReactQuill
        value={props.value}
        onChange={(e) => props.handleDes(e)}
        className="h-[218px] mb-4"
        placeholder="Insert your course description"
        theme="snow"
        modules={modules}
      />
    </>
  );
}

export default DynamicTextEditor;
