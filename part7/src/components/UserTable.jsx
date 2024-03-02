import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'

const UserTable = ({ userList }) => {

    return(
        <div>
            <Table striped hover>
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
                            <Link to={`/users/${user.id}`}>{user.name}</Link>
                            
                        </td>
                        <td>
                            {user.blogs.length}
                        </td>
                     </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default UserTable