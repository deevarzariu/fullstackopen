const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return <>
    {
      props.parts.map(({ name, exercises }, index) =>
        <Part name={name} exercises={exercises} key={index} />)
    }
  </>
}

const Part = (props) => {
  return <p>
    {props.name} {props.exercises}
  </p>
}

const Total = (props) => {
  const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises

  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App