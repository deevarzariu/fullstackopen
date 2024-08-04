import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
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
        <button onClick={handleGoodFeedback}>good</button>
        <button onClick={handleNeutralFeedback}>neutral</button>
        <button onClick={handleBadFeedback}>bad</button>
      </div>

      <div className="statistics">
        <h1>statistics</h1>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {all}</div>
        <div>average {average}</div>
        <div>positive {positivePerCent}%</div>
      </div>
    </div>
  )
}

export default App