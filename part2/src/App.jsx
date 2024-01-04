const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Course = ({course}) => {
  let total = course.parts.reduce((prev, current) => prev + current.exercises, 0);
  return(
    <>
      <h1>{course.name}</h1>
      {course.parts.map((part) => {
        return (<Part key={part.id} part={part} />)
      })}
      <p><b>total of {total} exercises</b></p>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course key={course.id} course={course} />
    </div>
    ) 
}

export default App