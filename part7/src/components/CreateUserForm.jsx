import { useDispatch } from 'react-redux'
import { updateNotification , deleteNotification} from '../reducers/notificationReducer'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { createNewUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const CreateUserForm = ({ setUserWasCreated, setIsCreatingUser }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5
  }

  const buttonStyle = {
    width: 150
  }

  const handleUserCreation = async (event) => {
    event.preventDefault()
    setUserWasCreated(true)
    const newUserObject = {
        username: username,
        password: password,
        name: name
    }
    try {
        dispatch(createNewUser(newUserObject))
        dispatch(updateNotification([`The user ${newUserObject.username} was created!`, 'success']));
        setTimeout(() => dispatch(deleteNotification()), 5000)
        setIsCreatingUser(false)
    } catch (exception) {
        console.log('something went wrong')
        dispatch(updateNotification([`Something went wrong!`, 'unsuccess']));
        setTimeout(() => dispatch(deleteNotification()), 5000)
    }
  }

  return(
    <div className='container'>
      <h2>Create a New User</h2>
      <Form onSubmit={handleUserCreation} style={formStyle}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control 
            type="text"
            name="username"
            placeholder='Enter username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control 
            type="password"
            name="password"
            placeholder='Enter password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>name</Form.Label>
          <Form.Control 
            type="name"
            name="name"
            placeholder='Enter your full name'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={buttonStyle}>Create User</Button>
        <Button variant="secondary" onClick={() => setIsCreatingUser(false)} style={buttonStyle}>Return</Button>
      </Form>
    </div>
  )
}

export default CreateUserForm