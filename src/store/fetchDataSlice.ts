import {createAsyncThunk, createSlice, PayloadAction, SerializedError} from '@reduxjs/toolkit';

const url = 'https://course-api.com/react-useReducer-cart-project';

export const fetchData = createAsyncThunk('taiwan/fetchData', async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export interface FetchDataSliceState {
  isLoading: boolean;
  logggedInUser:string
  data:{
    id: string;
    title: string;
    img: string;
    price: number;
    amount: number;
  }[];
  error: SerializedError[];
}

const initialState: FetchDataSliceState = {
  isLoading: true,
  logggedInUser:'',
  data: [{
    id: '',
    title: '',
    img: '',
    price: 0,
    amount: 0,
  }],
  error: [],
};

export const fetchDataSlice = createSlice({
  name: 'taiwan',
  initialState,
  reducers: {
    setLoggedInUser: (state, action:PayloadAction<string>)=>{
      state.logggedInUser = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error.push(action.error);
      });
  },
});

export const {setLoggedInUser} = fetchDataSlice.actions
export default fetchDataSlice.reducer
