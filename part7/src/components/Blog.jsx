import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateNotification, deleteNotification } from '../reducers/notificationReducer'
import { fetchBlogs, removeBlog, updateBlogLikes } from '../reducers/blogsReducer'

const Blog = ({ blog }) => {
  const blogId = blog.id
  const dispatch = useDispatch()
  const state = useSelector(state => state.blogs)
  const currentUser = useSelector(state => state.login)
  const currentLikes = state.find((blog) => blog.id === blogId).likes
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const hiddenStyle = {
    display: visible ? '' : 'none'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    const updatedLikes = currentLikes + 1
    const updatedBlog = {...blog, 'likes': updatedLikes}
    try {
      dispatch(updateBlogLikes(blogId, updatedBlog))
      dispatch(updateNotification([`The blog ${updatedBlog.title} was updated`, 'success']))
      setTimeout(() => dispatch(deleteNotification()), 5000)
    } catch(exception) {
      console.log(exception)
      dispatch(updateNotification(['Whoops, something went wrong', 'unsuccess']))
      setTimeout(() => dispatch(deleteNotification()), 5000)
    }
  }

  const deleteBlog = async () => {
    if (window.confirm(`Are you sure you want to remove ${blog.title}?`)) {
      try {
        dispatch(removeBlog(blogId))
        dispatch(fetchBlogs())
        dispatch(updateNotification(['The blog was removed', 'success']))
        setTimeout(() => dispatch(deleteNotification()), 5000)
      } catch(exception) {
        console.log(exception)
        dispatch(updateNotification(['Whoops, something went wrong', 'unsuccess']))
        setTimeout(() => dispatch(deleteNotification()), 5000)
      }
    }
  }

  return(
    <div>
      <div style={blogStyle} className='blog'>
        {blog.title}
        <button id='show-hide-button' onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
        <div style={hiddenStyle} className='hiddenBlogPart'>
          <p><a href={`${blog.url}`}>{blog.url}</a></p>
          <div id='likes-div'>
            Likes {blog.likes}
            <button id='like-button' onClick={addLike}>Like</button>
          </div>
          <button 
          id='remove-blog-button'
          onClick={deleteBlog}
          style={currentUser.name === blog.author ? {display: ''} : {display: 'none'}}
          >
            remove
          </button>
        </div>
        <p>{blog.author}</p>
      </div>
    </div>
  )}

export default Blog