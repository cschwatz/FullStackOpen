import { makeLogout } from "../reducers/loginReducer"
import { useDispatch } from "react-redux"

const LogoutButton = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(makeLogout(null))
  }

  return(
    <div>
      <button id='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutButton