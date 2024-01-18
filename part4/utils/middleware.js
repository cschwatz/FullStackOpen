const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'ValidationError') {
        return response.status(401).json({error: error.message})
    }

    next(error)
}

module.exports = errorHandler