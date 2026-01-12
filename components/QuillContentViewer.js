import "quill/dist/quill.snow.css";

const QuillContentViewer = ({ html }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }}></div>
  );
};

export default QuillContentViewer;
