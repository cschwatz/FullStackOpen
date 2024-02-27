import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        createBlog(state, action) {
            //receives blog object as payload
            state.concat(action.payload)
        },
        updateBlog(state, action) {
            const updatedBlog = action.payload
            state.map((blog) => blog.id !== updatedBlog.id ? blog : updatedBlog)
        },
        deleteBlog(state, action) {
            const toRemoveId = action.payload
            state.filter((blog) => blog.id !== toRemoveId)
        },
        getAllBlogs(state, action) {
            return action.payload
        }
    }
})

export const { createBlog, updateBlog, deleteBlog, getAllBlogs } = blogSlice.actions

export const fetchBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(getAllBlogs(blogs))
    }
}

export const createNewBlog = content => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch(createBlog(newBlog))
    }
}

export const updateBlogLikes = (id, blogObject) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(id, blogObject)
        dispatch(updateBlog(updatedBlog))
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(deleteBlog(id))
    }
}

export default blogSlice.reducer