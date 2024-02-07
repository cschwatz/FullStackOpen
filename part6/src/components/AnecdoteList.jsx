import { useSelector, useDispatch } from 'react-redux'
import { giveVote } from '../reducers/anecdoteReducer'
import { createNotification, deleteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdoteList = useSelector(({ anecdotes, filter }) => {
        if (filter && filter.trim() !== '') {
            return anecdotes.filter(anecdote => anecdote.content.indexOf(filter) >= 0 ? anecdote : null)
        } else {
            return anecdotes.map(anecdote => anecdote)
        }
    })
    
    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(giveVote(id))
        dispatch(createNotification(`you voted '${content}'`))
        setTimeout(() => dispatch(deleteNotification()), 5000)
      }

    return(
        <div>
            {anecdoteList
                .sort((anecdoteA, anecdoteB) => anecdoteB.votes - anecdoteA.votes)
                .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                    {anecdote.content}
                    </div>
                    <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AnecdoteList