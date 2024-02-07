import { useSelector } from "react-redux/es/hooks/useSelector"

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification ? '' : 'none'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification