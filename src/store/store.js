import { configureStore } from '@reduxjs/toolkit'
import AuthSlice  from './slice/authSlice';
export default configureStore({
  reducer: {
    auth: AuthSlice
  },
})