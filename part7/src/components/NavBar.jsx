import LogoutButton from "./LogoutButton"
import { Link } from "react-router-dom"

const NavBar = ({ username='' }) => {
    const divStyle = {
        background: 'rgb(200, 200, 200)',
        padding: 5,
        margin: 5,
        display: 'flex'
    }

    const padding = {
        padding: 5
    }

    return(
        <div style={divStyle}>
            <Link to='/' style={padding}>blogs</Link>
            <Link to='/users' style={padding}>users</Link>
            {(username === '') ? (
                <div></div>
            ) : (
                <span style={padding}><span><b>{username}</b></span> logged in</span>
            )}
            <LogoutButton />
        </div>
    )
}

export default NavBar