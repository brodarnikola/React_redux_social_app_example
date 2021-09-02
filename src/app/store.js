import { configureStore } from '@reduxjs/toolkit'
import notificationsSlice from '../features/notifications/notificationsSlice'
import postsSlice from '../features/posts/postsSlice'
import userSlice from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    posts: postsSlice,
    users: userSlice,
    notifications: notificationsSlice,
  },
})
