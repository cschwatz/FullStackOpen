import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer';

const NewAnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`The anecdote '${content}' was created`))
        setTimeout(() => dispatch(hideNotification()), 5000)
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