const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'ValidationError') {
        return response.status(401).json({error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('bearer ')) {
        const token = authorization.replace('bearer ', '')
        request.token = token
    }
    next()
}

const userExtractor = (request, response, next) => {
    if (request.method === 'GET') {
        next()
    } else {    
        const currentUser = jwt.verify(request.token, process.env.SECRET).id.toString()
        request.user = currentUser
        next()
    }
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}