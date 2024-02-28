import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const bloglist = [...blogs] // create a copy of state, because we cant mutate directly in redux
    const listingStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
      }

    return(
        <div>
            <Togglable buttonLabel="new Blog" hideLabel="cancel">
                <h2>Create new Blog</h2>
                <BlogForm />
            </Togglable>
            <h2>Blogs</h2>
            <div className='blogs'>
                {bloglist
                .sort((blogA, blogB) => blogB.likes - blogA.likes)
                .map(blog =>
                    <div style={listingStyle} key={blog.id}>
                        <Link to={`/blogs/${blog.id}`}>
                            {blog.title}
                        </Link>
                        <br></br>
                        by {blog.author}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlogList