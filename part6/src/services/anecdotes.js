import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getAnecdote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

const createNew = async (anecdoteContent) => {
    const object = {content: anecdoteContent, votes: 0}
    const response = await axios.post(baseUrl, object)
    return response.data
}

const update = async (id) => {
    const updatedAnecdote = await getAnecdote(id)
    updatedAnecdote.votes = updatedAnecdote.votes + 1
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return response.data
}

export default { getAll, createNew, update, getAnecdote }