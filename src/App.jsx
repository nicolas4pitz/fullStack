import { useState } from "react";
import Note from "./components/Note";

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

const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
