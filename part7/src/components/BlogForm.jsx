import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateNotification, deleteNotification } from '../reducers/notificationReducer'
import { createNewBlog, fetchBlogs } from '../reducers/blogsReducer'

const BlogForm = ({ user }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = (event) => {
    event.preventDefault()
    const newBlogObject = {
      title: title,
      url: url
    }
    try {
      dispatch(createNewBlog(newBlogObject))
      dispatch(fetchBlogs())
      dispatch(updateNotification([`The blog ${newBlogObject.title} was created by ${user.name}`, 'success']))
      setTimeout(() => dispatch(deleteNotification()), 5000)
    } catch(exception) {
      console.log(exception)
      dispatch(updateNotification(['Whoops, something went wrong', 'unsuccess']))
      setTimeout(() => dispatch(deleteNotification()), 5000)
    }
    setTitle('')
    setUrl('')
  }

  return(
    <div>
      <form onSubmit={handleBlogCreation}>
          title
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder='title of the blog'
          id='blog-title'
        />
          url
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder='url of the blog'
          id='blog-url'
        />
        <button id='create-blog-button' type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
