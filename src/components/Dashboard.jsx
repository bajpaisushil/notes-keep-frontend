import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import AddModal from "./AddModal";
import jwt_decode from "jwt-decode";
import Note from "./Note";
import "./dashboard.css";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import Cookies from "js-cookie";


function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNotes = async (req, res) => {
    // let token = document.cookie.split("=")[1];
    let token=Cookies.get('token');
    console.log('token value: ', token);

    try {
      axios({
        method: "GET",
        url: `${process.env.REACT_APP_API}/note/notes`,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log("response.data.data=> ", response.data.data);
          setNotes(response.data.data);
          setLoading(false);
          console.log("got notes=> ", notes);
        })
        .catch((error) => {
          setLoading(false);
          console.log("Error fetching notes=> ", error);
          toast.error('Error in fetching notes! Kindly Logout & Login again');
        });
    } catch (error) {
      console.error("Error fetching notes:", error);
      setLoading(false);
      toast.error('Error in fetching notes! Kindly Logout & Login again');
    }
  };
  useEffect(() => {
    // Fetch notes from the backend when the component mounts
    fetchNotes();
  }, []);

  const handleDeleteNote = async (note) => {
    try {
      await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API}/note/notes/${note._id}`,
        withCredentials: true,
      });
      setNotes(notes.filter((prev) => prev._id !== note._id));
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  const handleAddNote = (newNote) => {
    // Implement the logic to add the new note to the dashboard
    setNotes([...notes, newNote]);
    setShowNoteDialog(false);
    console.log("Adding new note:", newNote);
  };

  const getName = () => {
    const token = Cookies.get('token');
    let data = jwt_decode(token);
    console.log("data=> ", data);
    const firstName = data.name.trim().split(" ")[0];
    const name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    return name;
  };

  return (
    <div className="dashboard-page">
      {/* Dashboard content */}
      
      <div className="dashboard-container">
        <h2 className="dashboard-name">{getName()}'s Dashboard</h2>
        <Button variant="primary" onClick={() => setShowNoteDialog(true)}>
          Add New Note
        </Button>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">
            <SearchIcon />
          </button>
        </div>

        <div className="dashboard-note-container">
          {loading ? (
            <>
            <div className="progress"><CircularProgress /></div>
            <h5 className="progress_text">Fetching your notes...</h5>
            </>
          ) : (
            <div className="dashboard-note-store">
              {notes
                ?.filter(
                  (note) =>
                    (note.title && note.title.includes(query.toLowerCase())) ||
                    (note.content &&
                      note.content.includes(query.toLowerCase())) ||
                    (note.labels &&
                      note.labels.some((label) =>
                        label.includes(query.toLowerCase())
                      )) ||
                    (note.formattedCreateDate &&
                      note.formattedCreateDate.includes(query.toString())) ||
                    (note.formattedUpdateDate &&
                      note.formattedUpdateDate.includes(query.toString()))
                )
                .map((note) => (
                  <Note
                    note={note}
                    key={note._id}
                    onDeleteNote={handleDeleteNote}
                    onUpdateNote={(note) => setNoteToEdit(note)}
                  />
                ))}
            </div>
          )}

          {/* Modal */}
          {showNoteDialog && (
            <AddModal
              onDismiss={() => setShowNoteDialog(false)}
              onNoteSaved={handleAddNote}
            />
          )}
          {noteToEdit && (
            <AddModal
              onDismiss={() => setNoteToEdit(null)}
              onNoteSaved={(updatedNote) => {
                setNotes(
                  notes.map((existingNote) =>
                    existingNote._id === updatedNote._id
                      ? updatedNote
                      : existingNote
                  )
                );
                setNoteToEdit(null);
              }}
              noteToEdit={noteToEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
