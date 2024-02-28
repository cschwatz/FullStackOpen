import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useSelector } from 'react-redux'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const bloglist = [...blogs] // create a copy of state, because we cant mutate directly in redux

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
                <Blog
                    key={blog.id}
                    blog={blog}
                />
                )}
            </div>
        </div>
    )
}

export default BlogList