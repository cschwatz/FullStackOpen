import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, handleBlogUpdate, handleDeletion }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

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

  const addLike = async (event) => {
    setLikes((previousLikes) => {
      const updatedLikes = previousLikes + 1
      const updatedBlog = { ...blog, 'likes': updatedLikes }
      handleBlogUpdate(blog.id, updatedBlog)
      console.log(updatedBlog)
      return updatedLikes
    })
  }

  const removeBlog = async () => {
    if (window.confirm(`Are you sure you want to remove ${blog.title}?`)){
      await handleDeletion(blog.id)
    }
  }

  return(
    <div>
      <div style={blogStyle} className='blog'>
        {blog.title}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
        <div style={hiddenStyle} className='hiddenBlogPart'>
          <p><a href={`${blog.url}`}>{blog.url}</a></p>
          <div>
          Likes {likes}
            <button onClick={addLike}>Like</button>
          </div>
          <button onClick={removeBlog}>remove</button>
        </div>
        <p>{blog.author}</p>
      </div>
    </div>
  )}

export default Blog