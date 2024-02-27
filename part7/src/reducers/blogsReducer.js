import { createSlice } from '@reduxjs/toolkit'

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
export default blogSlice.reducer