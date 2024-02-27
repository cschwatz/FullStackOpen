import { useState } from 'react'
import blogs from '../services/blogs'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { updateNotification, deleteNotification } from '../reducers/notificationReducer'
import { deleteBlog, updateBlog } from '../reducers/blogsReducer'

const Blog = ({ blog, userName, id, blogs, setBlogs }) => {
  const [visible, setVisible] = useState(false)
  const state = useSelector(state => state.blogs)
  const currentLikes = state.find((blog) => blog.id === id).likes
  const dispatch = useDispatch()

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

  const handleBlogUpdate = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      dispatch(updateBlog(returnedBlog))
      dispatch(updateNotification([`The blog ${blogObject.title} was updated`, 'success']))
      setTimeout(() => dispatch(deleteNotification()), 5000)
    } catch(exception) {
      console.log(exception)
      dispatch(updateNotification(['Whoops, something went wrong', 'unsuccess']))
      setTimeout(() => dispatch(deleteNotification()), 5000)
    }
  }

  const addLike = async () => {
    const updatedLikes = currentLikes + 1
    const updatedBlog = {...blog, 'likes': updatedLikes}
    handleBlogUpdate(id, updatedBlog)
  }

  const handleBlogDeletion = async (id) => {
    try {
      await blogService.remove(id)
      dispatch(deleteBlog(id))
      dispatch(updateNotification(['The blog was removed', 'success']))
      setTimeout(() => dispatch(deleteNotification()), 5000)
    } catch(exception) {
      console.log(exception)
      dispatch(updateNotification(['Whoops, something went wrong', 'unsuccess']))
      setTimeout(() => dispatch(deleteNotification()), 5000)
    }
  }

  const removeBlog = async () => {
    if (window.confirm(`Are you sure you want to remove ${blog.title}?`)) {
      await handleBlogDeletion(id)
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
          onClick={removeBlog}
          style={userName === blog.author ? {display: ''} : {display: 'none'}}
          >
            remove
          </button>
        </div>
        <p>{blog.author}</p>
      </div>
    </div>
  )}

export default Blog