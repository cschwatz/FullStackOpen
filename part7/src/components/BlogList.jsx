import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dropdown, Table } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const [filteredBlogs, setFilteredBlogs] = useState(blogs)
    const aaa = [...blogs]

    useEffect(() => {
        if (blogs.length > 0) {
            setFilteredBlogs([...blogs])
        }
    }, [blogs])

    const tableStyle = {
        textWrap: 'wrap'
    }

    const divStyle = {
        padding: 10,
        margin: 10
    }

    const applyFilter = (filterType) => {
        const sortedBlogs = [...blogs]
        switch(filterType) {
            case 'titleAsc':
                sortedBlogs.sort((blogA, blogB) => blogA.title.localeCompare(blogB.title))
                break
            case 'titleDesc':
                sortedBlogs.sort((blogA, blogB) => blogB.title.localeCompare(blogA.title))
                break
            case 'authorAsc':
                sortedBlogs.sort((blogA, blogB) => blogA.author.localeCompare(blogB.author))
                break
            case 'authorDesc':
                sortedBlogs.sort((blogA, blogB) => blogB.author.localeCompare(blogA.author))
                break
            case 'likesAsc':
                sortedBlogs.sort((blogA, blogB) => blogA.likes - blogB.likes)
                break
            case 'likesDesc':
                sortedBlogs.sort((blogA, blogB) => blogB.likes - blogA.likes)
                break
            default:
                break
        }
        console.log(sortedBlogs)
        setFilteredBlogs(sortedBlogs)
    }

    if (blogs.length === 0) {
        return (
            <div className='container' style={divStyle}>
                <h2>Blogs</h2>
                <Togglable buttonLabel="new Blog" hideLabel="cancel">
                    <h2>Create new Blog</h2>
                    <BlogForm />
                </Togglable>

                <Dropdown>
                    <Dropdown.Toggle>
                        Filter Blogs
                    </Dropdown.Toggle>
                    <Dropdown.Menu onChange={applyFilter}>
                        <Dropdown.Item onClick={() => applyFilter('titleAsc')}>By title name ascending</Dropdown.Item>
                        <Dropdown.Item onClick={() => applyFilter('titleDesc')}>By title name descending</Dropdown.Item>
                        <Dropdown.Item onClick={() => applyFilter('authorAsc')}>By author name ascending</Dropdown.Item>
                        <Dropdown.Item onClick={() => applyFilter('authorDesc')}>By author name descending</Dropdown.Item>
                        <Dropdown.Item onClick={() => applyFilter('likesAsc')}>By number of likes ascending</Dropdown.Item>
                        <Dropdown.Item onClick={() => applyFilter('likesDesc')}>By number of likes descending</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
                <div className='blogs'>
                    Loading blog list...
                </div>
            </div>
        )
    }

    return(
        <div className='container' style={divStyle}>
            <h2>Blogs</h2>
            <Togglable buttonLabel="new Blog" hideLabel="cancel">
                <h2>Create new Blog</h2>
                <BlogForm />
            </Togglable>

            <Dropdown>
                <Dropdown.Toggle>
                    Filter Blogs
                </Dropdown.Toggle>
                <Dropdown.Menu onChange={applyFilter}>
                    <Dropdown.Item onClick={() => applyFilter('titleAsc')}>By title name ascending</Dropdown.Item>
                    <Dropdown.Item onClick={() => applyFilter('titleDesc')}>By title name descending</Dropdown.Item>
                    <Dropdown.Item onClick={() => applyFilter('authorAsc')}>By author name ascending</Dropdown.Item>
                    <Dropdown.Item onClick={() => applyFilter('authorDesc')}>By author name descending</Dropdown.Item>
                    <Dropdown.Item onClick={() => applyFilter('likesAsc')}>By number of likes ascending</Dropdown.Item>
                    <Dropdown.Item onClick={() => applyFilter('likesDesc')}>By number of likes descending</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            
            <div className='blogs'>
                <Table striped hover style={tableStyle}>
                <thead>
                    <tr>
                        <td>Blog title</td>
                        <td>Blog Author</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredBlogs
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