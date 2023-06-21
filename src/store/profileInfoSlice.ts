import {createAsyncThunk, createSlice, SerializedError} from '@reduxjs/toolkit';
import {API} from 'aws-amplify';
import {getUser} from '../graphql/queries';

export type GetUser = {
  username: string;
  name: string;
  bio: string;
  pronouns: string;
  gender: string;
  followers: string[];
  following: string[];
  profilePicKey: string;
};

export type ProfileInfoSliceState = {
  isLoading: boolean;
  profile: {
    getUser: GetUser;
  };
  error: SerializedError[];
};

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

export const fetchData = createAsyncThunk(
  'profileInfo/fetchData',
  async ({username, thangs}: {username: string; thangs?: string[]}) => {
    const query = !thangs
      ? getUser
      : /* GraphQL */ `
    query GetUser($username:String!){
    getUser(username:$username){
      ${thangs.join('\n')}
      }
  }
    `;
    try {
      const response = await API.graphql({
        query,
        variables: {
          username: username.toLowerCase(),
        },
      });
      console.log('data fetching successful!');
      return response;
    } catch (e) {
      console.log('data fetching unsuccessful! ', e);
    }
  },
);

export const profileInfoSlice = createSlice({
  name: 'profileInfo',
  initialState,
  reducers: {
    resetProfileInfo: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, {payload}) => {
        if (payload && 'data' in payload) {
          state.isLoading = false;
          state.profile = {
            getUser: {...state.profile.getUser, ...payload.data.getUser},
          };
        }
      })
      .addCase(fetchData.rejected, (state, {error}) => {
        state.isLoading = false;
        state.error.push(error);
      });
  },
});

export const {resetProfileInfo} = profileInfoSlice.actions;
export default profileInfoSlice.reducer;
