import { useDispatch } from 'react-redux';
import { newAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer';

const NewAnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        console.log(content)
        event.target.anecdote.value = ''
        dispatch(newAnecdote(content))
        dispatch(createNotification(`The anecdote '${content}' was created`))
        setTimeout(() => dispatch(deleteNotification()), 5000)
      }

    return(
        <div>
            <form onSubmit={addAnecdote}>
                <div>
                    <input name='anecdote' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default NewAnecdoteForm