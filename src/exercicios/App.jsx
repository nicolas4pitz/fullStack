import { useState } from "react";
import Course from "../components/Course";

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

const Botao = ({ handleClique, texto }) => (
  <button onClick={handleClique}>{texto}</button>
);

const Statistics = ({ good, neutral, bad, total, average }) => {
  if (good.length === 0 || neutral.length === 0 || bad.length === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <Part part="good" exercises={good} />
      <Part part="neutral" exercises={neutral} />
      <Part part="bad" exercises={bad} />
      <Part part="Total" exercises={total} />
      <Part part="average" exercises={average} />
      <Part part="positive" exercises={(good * 10).toFixed(2) + "%"} />
    </>
  );
};

function App() {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
    const atualTotal = total + 1;
    setAverage(atualTotal / 3);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
    const atualTotal = total + 1;
    setAverage(atualTotal / 3);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
    const atualTotal = total + 1;
    setAverage(atualTotal / 3);
  };

  return (
    <div>
      <Course course={courses} />
    </div>
  );
}

export default App;
