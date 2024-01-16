const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }
    let likes = 0
    blogs.forEach(blog => likes += blog.likes)
    return likes
}

module.exports = {
    dummy,
    totalLikes
}