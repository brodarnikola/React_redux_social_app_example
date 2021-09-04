import { configureStore } from '@reduxjs/toolkit'
import notificationsSlice from '../features/notifications/notificationsSlice'
import postsSlice from '../features/posts/postsSlice'
import userSlice from '../features/users/usersSlice'
import { apiSlice } from '../features/api/apiSlice'

export default configureStore({
  reducer: {
    posts: postsSlice,
    users: userSlice,
    notifications: notificationsSlice,
    // ensure that the caching reducer is added in the right place
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // middleware => it manages cache lifetimes and expiration.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
