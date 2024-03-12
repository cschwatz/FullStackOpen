import { useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import { fetchBlogs } from './reducers/blogsReducer'
import { makeLogin } from './reducers/loginReducer'
import { Routes, Route } from 'react-router-dom'
import { getAllUsers } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { useMatch } from 'react-router-dom'
import NavBar from './components/NavBar'
import { Navigate } from 'react-router-dom'
import CreateUserForm from './components/CreateUserForm'

const App = () => {
  const currentUser = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  
  // Blog rendering
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === Number(match.params.id)) : null

  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(getAllUsers())
  }, [dispatch])
  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(makeLogin(user))
    }
    console.log(currentUser)
  }, [dispatch])

  return (
    <div className='container'>
      {(currentUser !== null) ? 
      (<NavBar username={currentUser.name} />) 
      : (null)}
      <Notification />
      <Routes>
        <Route path='/' element={currentUser ? <BlogList /> : <Navigate replace to="/login"/>} />
        <Route path='blogs/:id' element={<Blog blog={blog} />}/>
        <Route path='/login' element={!currentUser ? <LoginForm /> : <Navigate replace to="/"/>} />
        <Route path='/register' element={<CreateUserForm />} />
        <Route path='/users' element={<Users />}/>
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </div>
  )
}

export default App