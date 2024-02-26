import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateNotification, deleteNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { createBlog } from '../reducers/blogsReducer'

const BlogForm = ({ user, blogs, setBlogs }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogCreation = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      // setBlogs(blogs.concat(returnedBlog))
      dispatch(createBlog(returnedBlog))
      dispatch(updateNotification([`The blog ${blogObject.title} was created by ${user.name}`, 'success']))
      setTimeout(() => dispatch(deleteNotification()), 5000)
    } catch(exception) {
      console.log(exception)
      dispatch(updateNotification(['Whoops, something went wrong', 'unsuccess']))
      setTimeout(() => dispatch(deleteNotification()), 5000)
    }
  }

  const addBlog = (event) => {
    console.log(event)
    console.log(title)
    console.log(url)
    event.preventDefault()
    handleBlogCreation({
      title: title,
      url: url
    })
    setTitle('')
    setUrl('')
  }

  return(
    <div>
      <form onSubmit={addBlog}>
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
