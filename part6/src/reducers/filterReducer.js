import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setFilter(state, action) {
            switch (action.type) {
                case 'filter/setFilter':
                    const newState = action.payload
                    return newState
                default:
                    return state
            }
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