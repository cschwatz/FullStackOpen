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

const BlogForm = ({ title, url, handleBlogCreation, setTitle, setUrl }) => {
  return(
    <div>
      <form onSubmit={handleBlogCreation}>
        title
        <input 
        type="text"
        value={title}
        onChange={({target}) => setTitle(target.value)}
        />
        url
        <input
        type="text"
        value={url}
        onChange={({target}) => setUrl(target.value)}
        />
      <button type="submit">Create</button>
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
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
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

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      url: url
    }
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setUrl('')
      changeNotification(`The blog ${title} was created by ${user.name}`, 'success')
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
      <h2>Create new Blog</h2>
      <BlogForm 
      title={title}
      url={url}
      handleBlogCreation={handleBlogCreation}
      setTitle={setTitle}
      setUrl={setUrl}
      />
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App