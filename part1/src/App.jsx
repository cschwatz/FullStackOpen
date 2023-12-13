//header -> name of the course
//Content -> render parts and number of exercises
//total -> render total number of exercices

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  );
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>  
  );
}

const Total = (props) => {
  return (
    <p>
      {props.exercises.exercises1 + props.exercises.exercises2 + props.exercises.exercises3}
    </p>
  );
}

const App = () => {
  const courseData = {
    course: 'Half Stack application development',
    parts: {
      part1: 'Fundamentals of React',
      part2: 'Using props to pass data',
      part3: 'State of a component'
    },
    exercises: {
      exercises1: 10,
      exercises2: 7,
      exercises3: 14
    }
  }

  return (
    <>
      <Header name={courseData.course} />
      <Part part={courseData.parts.part1} exercises={courseData.exercises.exercises1} />
      <Part part={courseData.parts.part2} exercises={courseData.exercises.exercises2} />
      <Part part={courseData.parts.part3} exercises={courseData.exercises.exercises3} />
      <Total exercises={courseData.exercises} />
    </>
  )
}

export default App