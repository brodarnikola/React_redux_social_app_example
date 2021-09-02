import React from 'react'
import { Link } from 'react-router-dom'
import { fetchNotifications } from '../features/notifications/notificationsSlice'
import { useDispatch, useSelector } from 'react-redux'

export const Navbar = () => {
  const dispatch = useDispatch()
  const notifications = useSelector((state) => state.notifications)
  const numberOfUnreadedNotifications = notifications.filter(
    (n) => !n.read
  ).length

  let unreadedNotifications
  if (numberOfUnreadedNotifications > 0)
    unreadedNotifications = (
      <span className="badge"> {numberOfUnreadedNotifications} </span>
    )

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications {unreadedNotifications}
            </Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
