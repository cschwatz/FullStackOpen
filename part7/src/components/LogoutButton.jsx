const LogoutButton = ({ setUser }) => {

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return(
    <div>
      <button id='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutButton