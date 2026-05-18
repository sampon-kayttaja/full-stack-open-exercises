import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Statistics = (props) => {
  console.log('Rendering statistics, current props:', props)
  if (props.all === 0) 
    return <p>No feedback given</p>
  return (<div>
    <p>good: {props.good}</p>
    <p>neutral: {props.neutral}</p>
    <p>bad: {props.bad}</p>
    <p>all: {props.all}</p>
    <p>average: {props.average}</p>
    <p>positive: {props.positivePercentage}</p>
  </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    console.log('good clicked')
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    console.log('neutral clicked')
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    console.log('bad clicked')
  }

  const all = () => {
    return good + neutral + bad
  }

  const average = () => {
    const total = all()
    if (total === 0) {
      return 0
    }
    return (good - bad) / total
  }

  const positivePercentage = () => {
    const total = all()
    if (total === 0) {
      return '0%'
    }
    return (good / total) * 100 + '%'
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGoodClick} />
      <Button text="neutral" onClick={handleNeutralClick} />
      <Button text="bad" onClick={handleBadClick} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all()}
        average={average()}
        positivePercentage={positivePercentage()}
      />
    </div>      
  )
}

export default App