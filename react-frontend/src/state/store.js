import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import authSlice from './authentication/authSlice'
import userSlice from './user/userSlice';
import bookSlice from './book/bookSlice'
import orderSlice from './order/orderSlice';

const rootReducer = combineReducers({
  auth : authSlice,
  users : userSlice,
  books : bookSlice,
  orders : orderSlice
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true, 
})
