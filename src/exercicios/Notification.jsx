const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message ? 'sucess' : ""}>
      {message}
    </div>
  )
}

export default Notification
