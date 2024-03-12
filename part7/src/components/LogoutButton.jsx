import { makeLogout } from "../reducers/loginReducer"
import { useDispatch } from "react-redux"
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"

const LogoutButton = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(makeLogout(null))
    navigate("/login")
  }

  return(
    <div>
      <Button variant="primary" onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default LogoutButton