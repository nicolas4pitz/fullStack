import { useState } from "react";

const Header = (props) => {
  console.log(props);
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      <Part part={props.part1} exercises={props.exercises1} />
      <Part part={props.part2} exercises={props.exercises2} />
      <Part part={props.part3} exercises={props.exercises3} />
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.exercises1 + props.exercises2 + props.exercises3}
      </p>
    </>
  );
};

function App() {
  const course = {
    name: "Desenvolvimento de aplicação Half Stack",
    parts: [
      {
        name: "Fundamentos da biblioteca React",
        exercises: 10,
      },
      {
        name: "Usando props para passar dados",
        exercises: 7,
      },
      {
        name: "Estado de um componente",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content
        part1={course.parts[0].name}
        part2={course.parts[1].name}
        part3={course.parts[2].name}
        exercises1={course.parts[0].exercises}
        exercises2={course.parts[1].exercises}
        exercises3={course.parts[2].exercises}
      />
      <Total
        exercises1={course.parts[0].exercises}
        exercises2={course.parts[1].exercises}
        exercises3={course.parts[2].exercises}
      />
    </div>
  );
}

export default App;
