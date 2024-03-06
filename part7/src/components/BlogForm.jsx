import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateNotification, deleteNotification } from '../reducers/notificationReducer'
import { createNewBlog } from '../reducers/blogsReducer'
import { Button } from 'react-bootstrap'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')

  const formStyle = {
    display: 'flex',
    gap: 5,
    alignItems: 'center'
  }

  const handleBlogCreation = (event) => {
    event.preventDefault()
    const newBlogObject = {
      title: title,
      url: url,
      content: content
    }
    try {
      dispatch(createNewBlog(newBlogObject))
      dispatch(updateNotification([`The blog ${newBlogObject.title} was created by ${user.name}`, 'success']))
      setTimeout(() => dispatch(deleteNotification()), 5000)
    } catch(exception) {
      console.log(exception)
      dispatch(updateNotification(['Whoops, something went wrong', 'unsuccess']))
      setTimeout(() => dispatch(deleteNotification()), 5000)
    }
    setTitle('')
    setUrl('')
    setContent('')
  }

  return(
    <div className='container'>
      <form onSubmit={handleBlogCreation} style={formStyle}>
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
        <textarea 
          value={content}
          onChange={({target}) => setContent(target.value)}
          placeholder='Type your post here!'
        />
        <Button variant="primary" type="submit">Create</Button>
      </form>
    </div>
  )
}

export default BlogForm
