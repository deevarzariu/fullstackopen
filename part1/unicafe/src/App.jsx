import { useState } from 'react'

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => <tr>
  <td>{text}</td>
  <td>{value}</td>
</tr>

const Statistics = ({ good, neutral, bad, all, average, positivePerCent }) => {
  if (all === 0) return <div>No feedback given</div>

  return <table>
    <tbody>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={`${positivePerCent}%`} />
    </tbody>
  </table>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }


  // the variables below used to be state variables, but I figured they didn't need to be.
  // all, average and positivePercent depend on the existing state variables (good, neutral, bad).
  // when one of those state variables changes, the App component re-renders and runs all the code inside it again.
  // which means that the variables below are calculated on every render and
  // their values will be up to date with the latest feedback.

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positivePercent = good / all * 100

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
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positivePerCent={positivePercent}
        />
      </div>
    </div>
  )
}

export default App