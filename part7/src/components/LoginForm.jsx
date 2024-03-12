import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { updateNotification , deleteNotification} from '../reducers/notificationReducer'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { attemptLogin } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5
  }

  const buttonStyle = {
    width: 150
  }

  const handleRegistrationForm = () => {
    navigate('/register')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const userObject = {
      username: username,
      password: password
    }
    try {
      const user = await dispatch(attemptLogin(userObject)) // using await because the dispatch handles a promise
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      console.log('Congratulations, you are connected')
      dispatch(updateNotification([`Welcome ${user.name}!`, 'success']));
      setTimeout(() => dispatch(deleteNotification()), 5000)
    } catch (exception) {
      console.log('Wrong credentials')
      dispatch(updateNotification(['wrong username or password', 'unsuccess']));
      setTimeout(() => dispatch(deleteNotification()), 5000)
      setUsername('')
      setPassword('')
    }
  }

  return(
    <div className='container'>
      <h2>Login</h2>
      <Form onSubmit={handleLogin} style={formStyle}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control 
            type="text"
            name="username"
            placeholder='Enter username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control 
            type="password"
            name="password"
            placeholder='Enter password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={buttonStyle}>Login</Button>
      </Form>
      <Button variant="secondary" onClick={handleRegistrationForm} style={buttonStyle}>Register</Button>
    </div>
  )
}

export default LoginForm