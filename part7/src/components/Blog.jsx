import { useDispatch, useSelector } from 'react-redux'
import { updateNotification, deleteNotification } from '../reducers/notificationReducer'
import { fetchBlogs, removeBlog, updateBlogLikes } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'
import { ListGroup, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import showdown from 'showdown'
import ReactHtmlParser from 'react-html-parser'

const Blog = () => {
  const converter = new showdown.Converter()
  const id = useParams().id
  const state = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.login)
  const blog = state.find((blog) => blog.id === id)
  const navigate = useNavigate()
  const htmlContent = converter.makeHtml(blog.content)

  const generateKey = () => Math.floor(Math.random() * 1000000)

  const commentListStyle = {
    display: 'flex'
  }

  const commentStyle = {
    width: 375,
    textWrap: 'wrap'
  }
  const likesStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 5
  }

  const divStyle = {
    padding: 15
  }

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
        dispatch(removeBlog(blog.id))
        dispatch(fetchBlogs())
        dispatch(updateNotification(['The blog was removed', 'success']))
        setTimeout(() => dispatch(deleteNotification()), 5000)
        navigate('/')
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
      <div className='blog' style={divStyle}>
        <h2>{blog.title}</h2>
        <div>
          <p><a href={`${blog.url}`}>{blog.url}</a></p>
          <div id='likes-div' style={likesStyle}>
            {blog.likes} Likes
            <Button variant='primary' onClick={addLike}>Like</Button>
          </div>
          <div>
            {ReactHtmlParser(htmlContent)}
          </div>
          <br></br>
          <Button
          variant='primary'
          onClick={deleteBlog}
          style={currentUser.name === blog.author ? {display: ''} : {display: 'none'}}
          >
            Remove
          </Button>
        </div>
        <br></br>
        <p><span><b>added by {blog.author}</b></span></p>
        <h3>Comments</h3>
        <CommentForm blogId={blog.id} style={commentListStyle} />
        {(blog.comments.length ) > 0 ? (
          <ListGroup>
            {blog.comments.map(comment => (
              <ListGroup.Item key={generateKey()} style={commentStyle}>
                {comment}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>
            There are no comments for this blog
          </p>
        )}
        
      </div>
    </div>
  )}

export default Blog