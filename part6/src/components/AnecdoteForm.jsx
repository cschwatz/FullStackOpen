import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const NewAnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        anecdoteService
            .createNew(content)
            .then(anecdote => dispatch(newAnecdote(anecdote)))
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