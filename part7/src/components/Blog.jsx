import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateNotification, deleteNotification } from '../reducers/notificationReducer'
import { fetchBlogs, removeBlog, updateBlogLikes } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'

const Blog = ({ blog2 }) => {
  const id = useParams().id
  const state = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.login)
  const blog = state.find((blog) => blog.id === id)

  const addLike = async () => {
    const updatedLikes = blog.likes + 1
    const updatedBlog = {...blog, 'likes': updatedLikes}
    try {
      dispatch(updateBlogLikes(id, updatedBlog))
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

  if (state.length === 0) {
    return <p>...Loading</p>
  }

  return(
    <div>
      <div className='blog'>
        <h2>{blog.title}</h2>
        <div>
          <p><a href={`${blog.url}`}>{blog.url}</a></p>
          <div id='likes-div'>
            {blog.likes} Likes
            <button id='like-button' onClick={addLike}>Like</button>
          </div>
          <br></br>
          <button 
          id='remove-blog-button'
          onClick={deleteBlog}
          style={currentUser.name === blog.author ? {display: ''} : {display: 'none'}}
          >
            remove
          </button>
        </div>
        <p>added by {blog.author}</p>
      </div>
    </div>
  )}

export default Blog