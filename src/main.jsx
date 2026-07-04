import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
//import App from "./App.jsx"; // Para aulas
import App from "./exercicios/App"; // Para exercicios

const notes = [
  {
    id: 1,
    content: "HTML é fácil",
    important: true,
  },
  {
    id: 2,
    content: "O navegador só pode executar JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET e POST são os métodos mais importantes do protocolo HTTP",
    important: true,
  },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App notes={notes} />
  </StrictMode>,
);
