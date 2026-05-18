import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

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
      <h1>statistics</h1>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {all()}</p>
      <p>average: {average()}</p>
      <p>positive: {positivePercentage()}</p>
    </div>      
  )
}

export default App
