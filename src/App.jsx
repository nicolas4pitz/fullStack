import { useState } from "react";
import Note from "./components/Note";
import { useEffect } from "react";
import axios from "axios";
import noteService from './services/notes'

const Hello = ({ nome, idade }) => {
  const anoDeNascimento = () => {
    const anoDeHoje = new Date().getFullYear();
    return anoDeHoje - idade;
  };

  return (
    <div>
      <p>
        Olá {nome}, você tem {idade} anos
      </p>
      <p>Então, você nasceu provavelmente em {anoDeNascimento()}.</p>
    </div>
  );
};

const Historico = (props) => {
  if (props.todosOsCliques.length === 0) {
    return <div>Clique em um dos botões para usar a aplicação!</div>;
  }
  return (
    <div>Histórico de cliques nos botões: {props.todosOsCliques.join(" ")}</div>
  );
};

const Botao = ({ handleClique, texto }) => (
  <button onClick={handleClique}>{texto}</button>
);

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const hook = () => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes);
    });
  };

  useEffect(hook, []);

  console.log("render ", notes.length, "notes");

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    })
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    }).catch(error => {
      alert(`the note '${note.content}' was already deleted from server`)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
