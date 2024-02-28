import { useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import { fetchBlogs } from './reducers/blogsReducer'
import { makeLogin } from './reducers/loginReducer'
import { Routes, Route, Link } from 'react-router-dom'
import { getAllUsers } from './reducers/userReducer'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const currentUser = useSelector(state => state.login)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchBlogs())
    dispatch(getAllUsers())
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
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/users' element={<Users />}/>
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </div>
  )
}

export default App