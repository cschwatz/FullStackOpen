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

const Statistics = ({ history }) => {
  if (history.length === 0) {
    return <p>No feedback given</p>
  } else {
    // all
    let total = 0
    history.forEach(num => total++)
    //average
    let avg = 0
    history.forEach(num => avg += num)
    // positive
    let totalPositives = 0
    history.filter(num => num > 0).forEach(filteredNum => totalPositives++)
    return (
      <div>
        <Display counter={total} text={'all'} />
        <Display counter={(total > 0 ? (avg / total) : 0)} text={'average'} />
        <Display counter={(total > 0 ? (totalPositives / total) * 100 : 0)} text={'positive'} />
      </div>
    )
  }
  
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
      <Statistics history={history} />
    </div>
  )
}

export default App