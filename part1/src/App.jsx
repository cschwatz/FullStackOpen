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

const StatsTable = ({ goodValue, neutralValue, badValue, history }) => {
  if (history.length === 0) {
    return <p>No feedback given</p>
  } else {
    let total = 0
    let avg = 0
    let positives = 0
    history.forEach(num => {
      if (num > 0) {
        positives++
      }
      total++
      avg += num
    })
    let avgTotal = (total > 0 ? (avg / total) : 0)
    let totalPositives = (total > 0 ? (positives / total) * 100 : 0)
    return (
      <Table 
        good={goodValue} 
        neutral={neutralValue} 
        bad={badValue} 
        all={total} 
        average={avgTotal} 
        positive={totalPositives} 
      />
    )
  }
}

const Table = ({ good, neutral, bad, all, average, positive}) => {
  return (
    <table>
        <tbody>
          <tr>
            <td>
              <Display counter={good} text={'good'} />
            </td>
          </tr>
          <tr>
            <td>
              <Display counter={neutral} text={'neutral'} />
            </td>
          </tr>
          <tr>
            <td>
              <Display counter={bad} text={'bad'} />
            </td>
          </tr>
          <tr>
            <td>
              <Display counter={all} text={'all'} />
            </td>
          </tr>
          <tr>
            <td>
              <Display counter={average} text={'average'} />
            </td>
          </tr> 
          <tr>
            <td>
              <Display counter={positive} text={'positive'} />
            </td>
          </tr> 
        </tbody>
      </table>
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

  return (
    <div>
      <Banner message={'give feedback'} />
      <Button onClick={handleGoodClick} text={'good'} />
      <Button onClick={handleNeutralClick} text={'neutral'} />
      <Button onClick={handleBadClick} text={'bad'} />
      <Banner message={'statistics'} />
      <StatsTable 
        goodValue={good}
        neutralValue={neutral}
        badValue={bad}
        history={history}
      />
    </div>
  )
}

export default App