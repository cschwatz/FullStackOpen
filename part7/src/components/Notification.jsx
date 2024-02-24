import { updateNotification } from "../reducers/notificationReducer"
import { useSelector } from 'react-redux'


const Notification = () => {
    const notification = useSelector(state => state.notification);
    const [message, type] = notification
    const notificationStyle = {
        color: type === 'success' ? 'green' : 'red',
        background: 'lightgrey',
        borderStyle: message ? 'solid' : 'none',
        borderRadius: 5,
        padding: message ? 10 : 0,
        fontSize: 20
    }

    return(
        <div style={notificationStyle}>
            { message }
        </div>
    )
}

export default Notification