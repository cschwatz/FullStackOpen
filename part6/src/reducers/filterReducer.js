const filterReducer = (state='', action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'SET_FILTER':
            const newState = action.payload
            return newState
        default:
            return state
    }
}

export const filterChange = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: filter
    }
}

export default filterReducer