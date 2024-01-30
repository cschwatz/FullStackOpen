import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog }) => {
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

  return(
    <div>
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleVisibility}>hide</button>
      <div style={hiddenStyle}>
        <p>{blog.url}</p>
        <div>
        Likes {blog.likes}
        <button>Like</button>
        </div>
        <p>{blog.author}</p>
      </div>
    </div>
  </div>
)}

export default Blog