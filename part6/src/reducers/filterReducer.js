import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setFilter(state, action) {
            const newState = action.payload
            return newState
        }
    }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer