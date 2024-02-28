import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const User = () => {
    const id = useParams().id
    const userList = useSelector(state => state.users)
    const user = userList.find(user => user.id === id)
    
    /* 
    Note that useSelector depends on the dispatch of the users state to the store, which is ASSYNC!
    Thus, while the state has not been updated, we need to use conditional rendering. Otherwise,
    this component will try to render the user which is null and will consequently crash.
    */
    
    if (userList.length === 0) {
        return <p>Loading...</p>
    }


    return(
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            {(user.blogs.length) > 0 ? (
                <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                ))}
            </ul>
            )
            : (
                <p>
                    This user has no blogs created!
                </p>
            )}
        </div>
    )
}

export default User