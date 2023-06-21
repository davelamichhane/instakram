import {configureStore} from '@reduxjs/toolkit';
import generalReducer from './generalSlice'
import profileInfoReducer from './profileInfoSlice'
import guestProfileInfoReducer from './guestProfileInfoSlice'

export const store = configureStore({
  reducer: {
    profileInfo:profileInfoReducer,
    general:generalReducer,
    guestProfileInfo:guestProfileInfoReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

