import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotification, updateNotification } from './reducers/notificationReducer'
import { getAllBlogs } from './reducers/blogsReducer'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const state = useSelector(state => state.blogs)
  const bloglist = [...state] // create a copy of state, because we cant mutate directly in redux
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  // renders when page is loaded and when bloglist changes
  useEffect(() => {
    blogService.getAll()
      .then(blogs => dispatch(getAllBlogs(blogs)))
  }, [bloglist])

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
      <div>
        <Notification />
        <LoginForm username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setUser={setUser}
        />
      </div>
    )
  }

  return (
    <div>
      <p>{user.name} logged in</p>
      <LogoutButton setUser={setUser} />
      <Notification />
      <Togglable buttonLabel="new Blog" hideLabel="cancel">
        <h2>Create new Blog</h2>
        <BlogForm
          user={user}
          blogs={blogs}
          setBlogs={setBlogs}
        />
      </Togglable>
      <h2>Blogs</h2>
      <div className='blogs'>
          {bloglist
          .sort((blogA, blogB) => blogB.likes - blogA.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              userName={user.name}
              id={blog.id}
              blogs={blogs}
              setBlogs={setBlogs}
            />
          )}
      </div>
    </div>
  )
}

export default App