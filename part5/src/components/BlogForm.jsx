import { useState } from 'react'

const BlogForm = ({ handleBlogCreation }) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
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
          onChange={({target}) => setTitle(target.value)}
          />
          url
          <input
          type="text"
          value={url}
          onChange={({target}) => setUrl(target.value)}
          />
        <button type="submit">Create</button>
        </form>
      </div>
    )
}

export default BlogForm