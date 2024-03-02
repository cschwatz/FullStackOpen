import { makeLogout } from "../reducers/loginReducer"
import { useDispatch } from "react-redux"
import { Button } from 'react-bootstrap'

const LogoutButton = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(makeLogout(null))
  }

  return(
    <div>
      <Button variant="primary" onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default LogoutButton