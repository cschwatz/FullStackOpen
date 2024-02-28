import { Link } from "react-router-dom"

const NavBar = ({ username }) => {
    const divStyle = {
        background: 'rgb(200, 200, 200)',
        padding: 5,
        margin: 5
    }

    const padding = {
        padding: 5
    }

    return(
        <div style={divStyle}>
            <Link to='/' style={padding}>blogs</Link>
            <Link to='/users' style={padding}>users</Link>
            <span style={padding}>{username} logged in</span>
        </div>
    )
}

export default NavBar