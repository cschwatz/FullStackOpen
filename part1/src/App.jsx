import { useState } from 'react'

const Banner = ({ message }) => {
  return (
    <h1>{message}</h1>
  )
} 

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Display = ({ counter, text }) => {
  return (
    <p>
     {text} {counter} {text === 'positive' ? '%' : ''}
    </p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [history, setHistory] = useState([])

  const handleGoodClick = () => {
    setGood(good + 1)
    setHistory(history.concat(1))
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setHistory(history.concat(0)) 
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setHistory(history.concat(-1))
  }
  const historySum = () => {
    let sum = 0
    history.forEach(num => sum += 1)
    return sum
  }
  const historyAvg = () => {
    let avg = 0
    let total = historySum()
    history.forEach(num => avg += num)
    return (total > 0 ? avg / total : 0)
  }
  const historyPositive = () => {
    let totalPositives = 0
    let total = 0
    history.forEach(num => {
      if (num > 0) {
        totalPositives++
      }
      total++
    })
    return (total > 0 ? (totalPositives / total) * 100 : 0)
  }

  return (
    <div>
      <Banner message={'give feedback'} />
      <Button onClick={handleGoodClick} text={'good'} />
      <Button onClick={handleNeutralClick} text={'neutral'} />
      <Button onClick={handleBadClick} text={'bad'} />
      <Banner message={'statistics'} />
      <Display counter={good} text={'good'} />
      <Display counter={neutral} text={'neutral'} />
      <Display counter={bad} text={'bad'} />
      <Display counter={historySum()} text={'all'} />
      <Display counter={historyAvg()} text={'average'} />
      <Display counter={historyPositive()} text={'positive'} />
    </div>
  )
}

export default App