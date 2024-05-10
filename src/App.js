import React, { useState, useEffect } from 'react';
import { BiSolidDuplicate } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(savedNotes);
  }, []);

  const addNote = () => {
    const noteInput = document.getElementById("noteInput");
    const noteContent = noteInput.value.trim();
    if (noteContent !== "") {
      const newNote = { content: noteContent };
      setNotes([...notes, newNote]);
      saveNoteToLocalStorage([...notes, newNote]);
      noteInput.value = "";
    } else {
      alert("Te rog adaugă o notiță validă!");
      console.error("[CONSOLE-ERROR] Un utilizator a introdus o notiță invalidă.");
    }
  };

  const addNoteOnEnter = (event) => {
    if (event.key === "Enter") {
      addNote();
    }
  };

  const saveNoteToLocalStorage = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  const deleteNote = (noteContent) => {
    const updatedNotes = notes.filter(note => note.content !== noteContent);
    setNotes(updatedNotes);
    deleteNoteFromLocalStorage(noteContent);
  };

  const deleteNoteFromLocalStorage = (noteContent) => {
    let notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes = notes.filter(note => note.content !== noteContent);
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  return (
    
    <div className="exterior">
      <center>
        <img src = "../logo.svg" alt="logo"/>
      </center>
      
      <div className="box">
        <header className="App-header">
          <center>
          <div style={{ position: 'relative' }}>
            <input type="text" id="noteInput" placeholder="Write a message to add in your notes" onKeyDown={addNoteOnEnter} />
            <BiSolidDuplicate style={{ position: 'absolute', right: '15px', top: '40%', transform: 'translateY(-50%)' }} />
          </div>
          </center>

          <div id="noteList">
            {notes.map((note, index) => (
              <div key={index} className="note">
                <p style={{ color: '#FFFCAB', fontSize: '16px', margin: '0px' }}>#{index + 1}</p> {}
                
                <div style={{ position: 'relative' }}>
                  <IoCloseSharp
                    style={{ color: '#ff787861', position: 'absolute', right: '5px', top: '-10px', cursor: 'pointer' }}
                    onClick={() => deleteNote(note.content)}
                  />
                </div>
                
                <p style={{ color: '#ffffff55', fontSize: '12px', margin: '0px' }} className="note-content">{note.content}</p>
              </div>
            
            ))}
          </div>
        </header>
      </div>  
    </div>
  );
}

export default App;