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

const Course = ({ course }) => {
  return (
    <div>
      {course.map((each) => (
        <div key={each.id}>
          <Header course={each.name} />
          {each.parts.map((part) => (
            <Part key={part.id} part={part.name} exercises={part.exercises} />
          ))}
          <p>
            Total of {each.parts.reduce((sum, part) => sum + part.exercises, 0)}{" "}
            exercises
          </p>
        </div>
      ))}
    </div>
  );
};

export default Course;
