const Course = (props) => {
  const Header = ({ course }) => <h1>{course.name}</h1>

  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
      </div>
    )
  }

  const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

  const Total = ({ course }) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <b>
        total of {totalExercises} exercises
      </b>
    )
  }

  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )
}

export default Course