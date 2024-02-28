import { useSelector } from "react-redux"


const UserTable = () => {
    const users = useSelector(state => state.users)
    const userList = [...users] // create a shallow copy because we cant directly mutate in redux

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td><b>blogs created</b></td>
                    </tr>
                </thead>
                <tbody>
                    {userList.map(user => (
                    <tr key={user.id}>
                        <td>
                            {user.name}
                        </td>
                        <td>
                            {user.blogs.length}
                        </td>
                     </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UserTable