import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, handleBlogUpdate }) => {
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
    const updatedLikes = blog.likes + 1
    const updatedBlog = {...blog, "likes": updatedLikes}
    await handleBlogUpdate(blog.id, updatedBlog)
    setLikes(updatedLikes)
  }

  return(
    <div>
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div style={hiddenStyle}>
        <p><a href={`${blog.url}`}>{blog.url}</a></p>
        <div>
        Likes {likes} 
        <button onClick={addLike}>Like</button>
        </div>
        <p>{blog.author}</p>
      </div>
    </div>
  </div>
)}

export default Blog