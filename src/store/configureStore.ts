import {configureStore} from '@reduxjs/toolkit';
import fetchDataReducer from './fetchDataSlice'
import generalReducer from './generalSlice'
import profileInfoReducer from './profileInfoSlice'

export const store = configureStore({
  reducer: {
    profileInfo:profileInfoReducer,
    fetchData:fetchDataReducer,
    general:generalReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

