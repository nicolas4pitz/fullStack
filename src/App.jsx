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

// props=argumentos, dentro do componenete lidamos com a nomeclatura de cada
const Exibir = ({ contador }) => {
  return <div>{contador}</div>;
};

const Botao = ({ onClick, texto }) => {
  return <button onClick={onClick}>{texto}</button>;
};

const App = () => {
  const [contador, setContador] = useState(0);

  const aumentarEmUm = () => setContador(contador + 1);
  const diminuirEmUm = () => setContador(contador - 1);
  const zerarContador = () => setContador(0);
  return (
    <div>
      <Exibir contador={contador} />
      <Botao onClick={aumentarEmUm} texto="mais+" />
      <Botao onClick={zerarContador} texto="zerar" />
      <Botao onClick={diminuirEmUm} texto="menos-" />
    </div>
  );
};

export default App;
