import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>

const Statistics = ({ good, neutral, bad, all, average, positivePerCent }) => {
  if (all === 0) return <div>No feedback given</div>

  return <>
    <StatisticLine text="good" value={good} />
    <StatisticLine text="neutral" value={neutral} />
    <StatisticLine text="bad" value={bad} />
    <StatisticLine text="all" value={all} />
    <StatisticLine text="average" value={average} />
    <StatisticLine text="positive" value={`${positivePerCent}%`} />
  </>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positivePerCent, setPositivePerCent] = useState(0)

  const handleGoodFeedback = () => {
    const newGood = good + 1
    setGood(newGood)

    calculateAll({ good: newGood, neutral, bad })
    calculateAverage({ good: newGood, neutral, bad })
    calculatePositivePerCent({ good: newGood, neutral, bad })
  }

  const handleNeutralFeedback = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)

    calculateAll({ good, neutral: newNeutral, bad })
    calculateAverage({ good, neutral: newNeutral, bad })
    calculatePositivePerCent({ good, neutral: newNeutral, bad })
  }

  const handleBadFeedback = () => {
    const newBad = bad + 1
    setBad(newBad)

    calculateAll({ good, neutral, bad: newBad })
    calculateAverage({ good, neutral, bad: newBad })
    calculatePositivePerCent({ good, neutral, bad: newBad })
  }

  const calculateAll = ({ good, neutral, bad }) => setAll(good + neutral + bad)

  const calculateAverage = ({ good, neutral, bad }) =>
    setAverage((good - bad) / (good + neutral + bad))


  const calculatePositivePerCent = ({ good, neutral, bad }) =>
    setPositivePerCent(good / (good + neutral + bad) * 100)

  return (
    <div>
      <div className="actions">
        <h1>give feedback</h1>
        <Button text="good" onClick={handleGoodFeedback} />
        <Button text="neutral" onClick={handleNeutralFeedback} />
        <Button text="bad" onClick={handleBadFeedback} />
      </div>

      <div className="statistics">
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positivePerCent={positivePerCent} />
      </div>
    </div>
  )
}

export default App