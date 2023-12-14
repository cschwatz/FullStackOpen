//header -> name of the course
//Content -> render parts and number of exercises
//total -> render total number of exercices

import { Component } from "react";

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  );
}

const Content = (props) => {
  return (
    <>
      <p>
        {props.course.parts[0].name} {props.course.parts[0].exercises}
      </p>
      <p>
        {props.course.parts[1].name} {props.course.parts[1].exercises}
      </p>
      <p>
        {props.course.parts[2].name} {props.course.parts[2].exercises}
      </p>
    </>  
  );
}

const Total = (props) => {
  return (
    <p>
      {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}
    </p>
  );
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App