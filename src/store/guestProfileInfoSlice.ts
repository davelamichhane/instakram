import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API} from 'aws-amplify';
import {getUser} from '../graphql/queries';
import {ProfileInfoSliceState} from './profileInfoSlice';

const initialState: ProfileInfoSliceState = {
  isLoading: false,
  profile: {
    getUser: {
      username: '',
      name: '',
      bio: '',
      pronouns: '',
      gender: '',
      followers: [],
      following: [],
      profilePicKey: '',
    },
  },
  error: [],
};

export const fetchGuestData = createAsyncThunk(
  'profileInfo/fetchGuestData',
  async (username:string) => {
    console.log('1. fetch guest data');
    try {
      const response = await API.graphql({
        query: getUser,
        variables: {
          username: username.toLowerCase(),
        },
      });
      console.log('Completed #1');

      return response;
    } catch (err) {
      console.log('Error Origin: guestProfileInfoSlice/store', err);
    }
  },
);

export const guestProfileInfoSlice = createSlice({
  name: 'guestProfileinfo',
  initialState,
  reducers: {
    resetGuestProfileInfo: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGuestData.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchGuestData.fulfilled, (state, {payload}) => {
        if (payload && 'data' in payload) {
          state.isLoading = false;
          state.profile = {
            getUser: {...state.profile.getUser, ...payload.data.getUser},
          };
        }
      })
      .addCase(fetchGuestData.rejected, (state, {error}) => {
        state.isLoading = false;
        state.error.push(error);
      });
  },
});

export const {resetGuestProfileInfo} = guestProfileInfoSlice.actions;
export default guestProfileInfoSlice.reducer;
