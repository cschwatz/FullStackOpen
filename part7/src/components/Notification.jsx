import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const Notification = () => {
    const notification = useSelector(state => state.notification)
    const [message, type] = notification
    const variantStyle = type === 'success' ? "success" : "danger"

    return(
        <div>
            {(message) ? (
                <Alert variant={variantStyle}>
                { message }
                </Alert>
            ) : (
                null
            )}
        </div>
    )
}

export default Notification