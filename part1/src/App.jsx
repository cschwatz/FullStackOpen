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
     {text} {counter}
    </p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1) 
  const handleBadClick = () => setBad(bad + 1)

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
    </div>
  )
}

export default App