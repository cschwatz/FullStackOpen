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

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let highestLiked = {likes: 0}
    blogs.forEach((blog) => {
        if (blog.likes > highestLiked.likes) {
            highestLiked = blog
        }
    })
    return highestLiked
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}