import { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import { fetchBlogs } from './reducers/blogsReducer'
import { makeLogin } from './reducers/loginReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const bloglist = [...blogs] // create a copy of state, because we cant mutate directly in redux
  const currentUser = useSelector(state => state.login)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchBlogs())
    console.log('hellooo')

  }, [])
  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(makeLogin(user))
    }
  }, [dispatch])

  if (currentUser === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <p>{currentUser.name} logged in</p>
      <LogoutButton />
      <Notification />
      <Togglable buttonLabel="new Blog" hideLabel="cancel">
        <h2>Create new Blog</h2>
        <BlogForm
          user={currentUser}
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
              userName={currentUser.name}
              id={blog.id}
            />
          )}
      </div>
    </div>
  )
}

export default App