const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) => <p>
  {part.name} {part.exercises}
</p>

const Content = ({ parts }) => <>
  {parts.map(part => <Part part={part} key={part.name} />)}
</>

const Course = ({ course }) => <div>
  <Header course={course.name} />
  <Content parts={course.parts} />
  <Total sum={course.parts.reduce((acc, current) => acc + current.exercises, 0)} />
</div>


export default Course;