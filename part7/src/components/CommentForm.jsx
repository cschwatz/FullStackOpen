import { useEffect, useState } from "react"
import { fetchBlogs } from "../reducers/blogsReducer"
import { updateNotification, deleteNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { createComment } from "../reducers/blogsReducer"

const CommentForm = ({ blogId }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const makeComment = (event) => {
        event.preventDefault()
        try {
            dispatch(createComment(comment, blogId))
            dispatch(updateNotification(['A new comment was created', 'success']))
            setTimeout(() => dispatch(deleteNotification()), 5000)
            setComment('')
        } catch {
            console.log('something went wrong')
            dispatch(updateNotification(['unable to make comment', 'unsuccess']))
            setTimeout(() => dispatch(deleteNotification()), 5000)
        }
        
    }

    return(
        <div>
            <form onSubmit={makeComment}>
                <input 
                    type="text"
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                />
                <button type='submit'>
                    make comment
                </button>
            </form>
        </div>
    )
}

export default CommentForm