import { useState } from "react"
import { updateNotification, deleteNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { createComment } from "../reducers/blogsReducer"
import { Button } from "react-bootstrap"

const CommentForm = ({ blogId }) => {
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const commentStyle = {
        display: 'flex',
        gap: 5,
        padding: 5
    }

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
        <div  onSubmit={makeComment}>
            <form style={commentStyle}>
                <input 
                    type="text"
                    value={comment}
                    onChange={({ target }) => setComment(target.value)}
                />
                <Button variant='primary' type='submit'>
                    make comment
                </Button>
            </form>
        </div>
    )
}

export default CommentForm