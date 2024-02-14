import { useState } from "react"

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = (resetValue) => {
        setValue('')
    }

    

    return {
        type,
        value,
        reset,
        onChange
    }
}