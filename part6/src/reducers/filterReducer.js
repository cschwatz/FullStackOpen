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

export const filterChange = (filter) => {
    return {
        type: 'filter/setFilter',
        payload: filter
    }
}

export default filterSlice.reducer