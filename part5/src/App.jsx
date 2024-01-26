import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({username, password, setUsername, setPassword, handleLogin}) => {
  return(
    <div>
      <form onSubmit={handleLogin}>
        username
        <input 
        type="text"
        value={username}
        name="Username"
        onChange={({target}) => setUsername(target.value)}
        />
        <br></br>
        password
        <input 
        type="password"
        value={password}
        name="Password"
        onChange={({target}) => setPassword(target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

const LogoutButton = ({ handleLogout }) => {
  return(
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('Congratulations, youre connected', user)
    } catch (exception) {
      console.log('Wrong credentials')
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return (
      <LoginForm username={username} 
        password={password} 
        setUsername={setUsername} 
        setPassword={setPassword}
        handleLogin={handleLogin}
        />
    )
  }

  return (
    <div>
      <p>{user.name} logged in</p>
      <LogoutButton handleLogout={handleLogout} />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App