import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const bloglist = [...blogs] // create a copy of state, because we cant mutate directly in redux

    const tableStyle = {
        textWrap: 'wrap'
    }

    const divStyle = {
        padding: 10,
        margin: 10
    }

    return(
        <div className='container' style={divStyle}>
            <h2>Blogs</h2>
            <Togglable buttonLabel="new Blog" hideLabel="cancel">
                <h2>Create new Blog</h2>
                <BlogForm />
            </Togglable>
            
            <div className='blogs'>
                <Table striped hover style={tableStyle}>
                    <thead>
                        <tr>
                            <td>Blog title</td>
                            <td>Blog Author</td>
                        </tr>
                    </thead>
                    <tbody>
                        {bloglist
                        .sort((blogA, blogB) => blogB.likes - blogA.likes)
                        .map(blog =>
                            <tr key={blog.id}>
                                <td>
                                    <Link to={`/blogs/${blog.id}`}>
                                        {blog.title}
                                    </Link>
                                </td>
                                <td>
                                    {blog.author}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default BlogList