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

export default Course