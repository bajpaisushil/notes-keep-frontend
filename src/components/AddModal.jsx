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
  const [addNoteClicked, SetAddNoteClicked] = useState(false);

  useEffect(() => {
    // Pre-fill form fields if noteToEdit is provided
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
      setLabels(noteToEdit.labels.join(", "));
    }
  }, [noteToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      title,
      content,
      labels: labels.split(",").map((label) => label.trim()),
    };
    try {
      if (noteToEdit) {
        axios({
          method: "PUT",
          url: `${process.env.REACT_APP_API}/note/notes/${noteToEdit._id}`,
          data: newNote,
          withCredentials: true,
        }).then((res) => {
          onNoteSaved(res.data.note);
          toast.success(res.data.message);
        });
      } else {
        axios({
          method: "POST",
          url: `${process.env.REACT_APP_API}/note/notes`,
          data: newNote,
          withCredentials: true,
        }).then((res) => {
          onNoteSaved(res.data.note);
          toast.success(res.data.message);
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
        <Modal.Title>{noteToEdit ? "Update" : "Add Note"}</Modal.Title>
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
          >
            {noteToEdit? "Update": "Add Note"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
