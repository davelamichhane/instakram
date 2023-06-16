import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {API} from 'aws-amplify';
import {getUser} from '../graphql/queries';

type ProfileInfoSliceState = {
  username: string;
  profileInfo: {
    name: string;
    bio: string;
    pronouns: string;
    gender: string;
    followers: string[];
    following: string[];
    profilePicKey: string;
  };
};

const initialState: ProfileInfoSliceState = {
  username: '',
  profileInfo: {
    name: '',
    bio: '',
    pronouns: '',
    gender: '',
    followers: [],
    following: [],
    profilePicKey: '',
  },
};

const fetchData = createAsyncThunk('profileInfo/fetchData', async () => {
  const response = API.graphql({
    query: getUser,
  });
  return response;
});

export const profileInfoSlice = createSlice({
  name: 'profileInfo',
  initialState,
  reducers: {
    setAuthUsername: (state,action:PayloadAction<string>)=>{
      state.username = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.username = 'ahahah'
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.username = 'asdfa'
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.username = 'asdfasdfasdfa'
      });
  },
});

export const {setAuthUsername}= profileInfoSlice.actions
export default profileInfoSlice.reducer;
