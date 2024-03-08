import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { updateNotification , deleteNotification} from '../reducers/notificationReducer'
import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { attemptLogin } from '../reducers/loginReducer'
import CreateUserForm from './CreateUserForm' 
import { useSelector } from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)
  const [isCreatingUser, setIsCreatingUser] = useState(false)
  const [userWasCreated, setUserWasCreated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    console.log(users)
    setUserWasCreated(false)
  }, [])

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
    setIsCreatingUser(true)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const userObject = {
      username: username,
      password: password
    }
    try {
      dispatch(attemptLogin(userObject))
      const user = users.filter(user => user.username === userObject.username)
      console.log(user)
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

  if (isCreatingUser) {
    return(
      <CreateUserForm setUserWasCreated={setUserWasCreated} setIsCreatingUser={setIsCreatingUser} />
    )
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