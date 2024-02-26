import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        createBlog(state, action) {
            //receives blog object as payload
            console.log(action.payload)
            state.concat(action.payload)
        },
        updateBlog(state, action) {
            // TODO
            return state
        },
        deleteBlog(state, action) {
            // TODO
            return state
        },
        getAllBlogs(state, action) {
            return action.payload
        }
    }
})

export const { createBlog, updateBlog, deleteBlog, getAllBlogs } = blogSlice.actions
export default blogSlice.reducer