import { useState } from 'react'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Statistics = (props) => {
  console.log('Rendering statistics, current props:', props)
  if (props.all === 0) 
    return <p>No feedback given</p>
  return (<div>
    <h1>statistics</h1>
    <table>
      <tbody>
        <StatisticsLine text="good" value={props.good} />
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine text="bad" value={props.bad} />
        <StatisticsLine text="all" value={props.all} />
        <StatisticsLine text="average" value={props.average} />
        <StatisticsLine text="positive" value={props.positivePercentage} />
      </tbody>
    </table>
  </div>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  const all = () =>  good + neutral + bad

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