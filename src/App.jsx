import { useState } from "react";

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
  const [esquerda, setEsquerda] = useState(0);
  const [direita, setDireita] = useState(0);
  const [todosOsCliques, setTodos] = useState([]);
  const [total, setTotal] = useState(0);

  const handleCliqueEsquerda = () => {
    setTodos(todosOsCliques.concat("E"));
    const atualizaEsquerda = esquerda + 1;
    setEsquerda(esquerda + 1);
    setTotal(atualizaEsquerda + direita);
  };

  const handleCliqueDireita = () => {
    setDireita(direita + 1);
    const atualizaDireita = direita + 1;
    setTotal(esquerda + atualizaDireita);
  };

  return (
    <div>
      {esquerda}
      <Botao handleClique={handleCliqueEsquerda} texto="Esquerda" />
      <Botao handleClique={handleCliqueDireita} texto="Direita" />
      {direita}
      <Historico todosOsCliques={todosOsCliques} />
    </div>
  );
};

export default App;
