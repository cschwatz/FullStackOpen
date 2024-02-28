import { useSelector } from "react-redux"
import UserTable from "./UserTable"

const Users = () => {
    const users = useSelector(state => state.users)
    const userList = [...users] // create a shallow copy because we cant directly mutate in redux

    return(
        <div>
            <h2>Users</h2>
            <UserTable userList={userList} />
        </div>
    )
}

export default Users