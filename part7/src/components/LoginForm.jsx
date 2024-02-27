import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { updateNotification , deleteNotification} from '../reducers/notificationReducer'
import { makeLogin } from '../reducers/loginReducer'
import { useState } from 'react'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      dispatch(makeLogin(user))
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
    <div>
      <form onSubmit={handleLogin}>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id='username'
        />
        <br></br>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id='password'
        />
        <button id='login-button' type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm