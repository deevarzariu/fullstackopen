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

  // TLDR: removed state variables all, average and positivePerCent because they were not necessary

  // removed the all, average and positivePerCent state variables because they do not need to be state variables.
  // they depend completely on the variables good, neutral and bad
  // I replaced usage of all, average and positivePerCent in the return statement with 
  // functions that calculate these values during render.

  // the displayed results will be accurate and up to date
  // because the app re-renders every time any of the state variables changes.
  // this means that, when we call calculateAll, which adds up the values good, bad, and neutral
  // it will take the latest values of these state variables and return a result that reflects these values

  // also, this removes some re-renders that would have occurred
  // when updating all/average/positivePerCent, since re-renders occur on state change.
  // yay for optimization!! (?)

  const handleGoodFeedback = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }

  const calculateAll = () => good + neutral + bad

  const calculateAverage = () => (good - bad) / (good + neutral + bad)

  const calculatePositivePerCent = () => `${good / (good + neutral + bad) * 100}%`

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
          all={calculateAll()}
          average={calculateAverage()}
          positivePerCent={calculatePositivePerCent()}
        />
      </div>
    </div>
  )
}

export default App