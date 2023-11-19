import React, { useState } from "react";
import { Card, Badge, Button, Modal, Overlay } from "react-bootstrap";
import "./note.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Note = ({ note, onDeleteNote, onUpdateNote }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="note-parent-component">
      <Card className="note-component">
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.content}</Card.Text>
          {note.labels.length > 0 && (
            <div className="mb-2">
              <strong>Labels:</strong>{" "}
              {note.labels.map((label, index) => (
                <Badge key={index} className="note-labels me-1">
                  {label}
                </Badge>
              ))}
            </div>
          )}
          <div className="note-buttons">
            <Button
              variant="primary"
              className="note-update-btn"
              style={{ backgroundColor: "#8A2BE2", borderColor: "#8A2BE2" }}
              onClick={() => onUpdateNote(note)}
            >
              <EditOutlinedIcon />
            </Button>
            <Button
              className="note-delete-btn"
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
            >
              <DeleteOutlinedIcon />
            </Button>
          </div>
        </Card.Body>

        <Card.Footer className="text-muted">
          <div>Created At: {note.formattedCreateDate}</div>
          {note?.formattedUpdateDate && <div>Updated At: {note.formattedUpdateDate}</div>}
        </Card.Footer>
      </Card>

      {/* Deletion Confirmation Modal */}
        <Modal
          centered
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this note?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => onDeleteNote(note)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default Note;
