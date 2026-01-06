import "quill/dist/quill.snow.css";

const QuillContentViewer = ({ html }) => {
  return (
    <div 
      className="ql-snow"  // apply Quill theme styling
      style={{ padding: "10px", borderRadius: "6px" }}
    >
      <div 
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </div>
  );
};

export default QuillContentViewer;