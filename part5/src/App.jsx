import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Togglable'
import BlogForm from './components/BlogForm'

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

const Notification = ({message, type}) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    borderStyle: message ? 'solid' : 'none',
    borderRadius: 5,
    padding: message ? 10 : 0,
    fontSize: 20,
  }

  return(
    <div style={notificationStyle}>
      {message}
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
  const [notification, setNotification] = useState('')
  const [notificationType, setNotificationType] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('Congratulations, youre connected', user)
      changeNotification(`Welcome ${user.name}!`, 'success')
      setTimeout(() => changeNotification(null), 5000)
    } catch (exception) {
      console.log('Wrong credentials')
      changeNotification(`wrong username or password`, 'unsuccess')
      setTimeout(() => changeNotification(null), 5000)
      setUsername('')
      setPassword('')
    }
  }

  const handleBlogCreation = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      changeNotification(`The blog ${blogObject.title} was created by ${user.name}`, 'success')
      setTimeout(() => changeNotification(null), 5000)
    } catch(exception) {
      console.log(exception)
      changeNotification(`Whoops, something went wrong`, 'unsuccess')
      setTimeout(() => changeNotification(null), 5000)
    } 
  }

  const handleBlogUpdate = async (id, blogObject) => {
    console.log(blogObject)
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      changeNotification(`The blog ${blogObject.titke} was updated`, 'success')
      setTimeout(() => changeNotification(null), 5000)
    } catch(exception) {
      console.log(exception)
      changeNotification(`Whoops, something went wrong`, 'unsuccess')
      setTimeout(() => changeNotification(null), 5000)
    }
  }

  const changeNotification = (message, type) => {
    setNotification(message)
    setNotificationType(type)
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
      blogService.setToken(user.token)
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
      <Notification message={notification} type={notificationType} />
      <Toggleable buttonLabel="new Blog" hideLabel="cancel">
        <h2>Create new Blog</h2>
        <BlogForm
        handleBlogCreation={handleBlogCreation}
        />
      </Toggleable>
      <h2>Blogs</h2>
      {blogs
      .sort((blogA, blogB) => blogB.likes - blogA.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} handleBlogUpdate={handleBlogUpdate}/>
      )}
    </div>
  )
}

export default App