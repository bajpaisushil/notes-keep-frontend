// components/AddNoteModal.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "./addModal.css";

const AddModal = ({ onDismiss, onNoteSaved, noteToEdit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [labels, setLabels] = useState([]);
  const [disabled, setDisabled]=useState(false);
  const [addButtonText, setAddButtonText]=useState('Add Note');
  const [updateButtonText, setUpdateButtonText]=useState('Update Note');
  const [addNoteClicked, SetAddNoteClicked] = useState(false);

  useEffect(() => {
    // Pre-fill form fields if noteToEdit is provided
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setLabels(noteToEdit.labels.join(","));
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    const newNote = {
      title,
      content,
      labels: labels.split(",").map((label) => label.trim()),
    };
    try {
      if (noteToEdit) {
        setUpdateButtonText("Updating note ...");
        axios({
          method: "PUT",
          url: `${process.env.REACT_APP_API}/note/notes/${noteToEdit._id}`,
          data: newNote,
          withCredentials: true,
        }).then((res) => {
          setTimeout(()=>{
            onNoteSaved(res.data.note);
          }, [100])
          toast.success(res.data.message);
          setDisabled(false);
        });
      } else {
        setAddButtonText("Adding note ...");

        axios({
          method: "POST",
          url: `${process.env.REACT_APP_API}/note/notes`,
          data: newNote,
          withCredentials: true,
        }).then((res) => {
          setTimeout(()=>{
            onNoteSaved(res.data.note);
          }, [100])
          toast.success(res.data.message);
          setDisabled(false);
        });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error);
    }
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? updateButtonText : addButtonText }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="labels">
            <Form.Label>Labels</Form.Label>
            <Form.Control
              type="text"
              value={labels}
              placeholder="Labels (Comma Separated)"
              onChange={(e) => setLabels(e.target.value)}
            />
          </Form.Group>
          <Button
            className="modal-addnote"
            style={{ margin: "1rem auto auto auto" }}
            variant="primary"
            type="submit"
            disabled={disabled}
          >
            {noteToEdit? updateButtonText: addButtonText}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
