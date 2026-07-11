import { useState } from "react";
import Course from "../components/Course";
import { useEffect } from "react";
import axios from "axios";
import personsService from '../services/persons'
import Notification from "./Notification";

const Header = (props) => {
  //console.log(props);
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

const Botao = ({ handleClique, texto, person }) => (
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

const Filter = (props) => {
  return (
    <div>
      <p>
        filter show with{" "}
        <input onChange={props.handleFilter} value={props.filterPhone} />
      </p>
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addNamePhone}>
        <div>
          name:{" "}
          <input onChange={props.handleNameChange} value={props.newName} />
        </div>
        <div>
          number:{" "}
          <input onChange={props.handlePhoneChange} value={props.newPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.filterList.map((name) => (
        <p key={name.id}>
          {name.name} : {name.number}
          <Botao handleClique={() => props.handleDelete(name.id, name.name)} texto={props.texto} person={name} /></p>
      ))}
    </div>
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

  //Fica Aqui nesse componente------------------------
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [newPerMessage, setNewPerMessage] = useState("");
  //-------------------------------

  //Desestruturacao em uma funcao
  const hook = () => {
    console.log("efeito");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("fullfiled");
      setPersons(response.data);
    });
  };
  useEffect(hook, []);

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

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilter = (event) => {
    setFilterPhone(event.target.value);
  };

  const handleDelete = (id, name) => {

    if (window.confirm(`Delete ${name}?`)) {
      personsService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
      }).catch(error => {
        alert(`The person '${name}' was already deleted from server`)
      })
    }
  }

  const addNamePhone = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPersona = {
        name: newName,
        number: newPhone,
        id: persons.length + 1,
      };

      personsService.create(newPersona).then(returnedNote => {
        setNewPerMessage(`Added ${newName}`)
        setTimeout(() => {
          setNewPerMessage("")
        }, 5000)
        setPersons(persons.concat(returnedNote));
        setNewName("");
        setNewPhone("");
      })
    }
  };

  const filterList = persons.filter((name) =>
    name.name.toLowerCase().includes(filterPhone.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPhone={filterPhone} handleFilter={handleFilter} />

      <h3>Add a new</h3>

      <Notification message={newPerMessage}/>
      <PersonForm
        addNamePhone={addNamePhone}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        newName={newName}
        newPhone={newPhone}
      />

      <h2>Numbers</h2>

      <Persons filterList={filterList} handleDelete={handleDelete} texto={'delete'} />

      {/* <Course course={courses} />*/}
    </div>
  );
}

export default App;
