import React, { useState, useEffect, useRef, useMemo } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML  , convertFromHTML } from "draft-convert";
import "./descriptionEditor.css";
import Button from "../../../Component/button/Button/Button";
import parse from "html-react-parser";


const DescriptionEditor = (props) => {

  const editor = useRef(null);
  const { showLongDescriptionEditor, setShowLongDescriptionEditor , setLongDescriptionContent , londDescriptionContent } = props;
   
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState?.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  useEffect(() =>{
    setEditorState(EditorState.createWithContent(convertFromHTML(londDescriptionContent)))
  },[londDescriptionContent])

  const handleUpdate = () => {
    setShowLongDescriptionEditor(false);
    setLongDescriptionContent(convertedContent)
  };

  return (
    <Modal show={showLongDescriptionEditor} size="lg">
      <div className="whlearn">
        <div className="dmInEdHeader">
          <h4>Descriptions</h4>
          <AiOutlineCloseCircle
            color="white"
            size={25}
            onClick={() => setShowLongDescriptionEditor(false)}
          />
        </div>
        <Editor
          editorStyle={{
            height: 200,
            margin: 12,
            borderWidth: 0.5,
            padding: 10,
            borderRadius: "2px",
          }}
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "fontFamily",
              "list",
              "textAlign",
              "colorPicker",
              "embedded",
              "remove",
              "history",
            ],
          }}
          editorState={editorState}
          toolbarClassName=""
          wrapperClassName=""
          editorClassName="editorCont"
          onEditorStateChange={setEditorState}
        />
          <div
        className="d-flex justify-content-center "
        style={{ marginBottom: "20px" }}
      >
        <Button title="Update" onClick={handleUpdate} />
      </div>
      </div>
    
    </Modal>
  );
};

export default DescriptionEditor;
