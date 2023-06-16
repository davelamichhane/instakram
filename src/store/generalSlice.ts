import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type AccountType = {
  email: string;
  username: string;
  password: string;
};

export type ActiveTabType = 'home' | 'search' | 'reels' | 'shop' | 'profile';

export type GeneralState = {
  isLoggedIn: boolean;
  isWaiting:boolean;
  account: AccountType;
  imageUri: string;
  activeTab: ActiveTabType;
  temp: number;
};

const initialState: GeneralState = {
  isLoggedIn: false,
  isWaiting:false,
  account: {
    email: '',
    username: '',
    password: '',
  },
  imageUri: '',
  activeTab: 'home',
  temp:0
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setIsWaiting: (state, action:PayloadAction<boolean>)=> {
    state.isWaiting = action.payload
    },
    setAccount: (state, action: PayloadAction<AccountType>) => {
      state.account = action.payload;
    },
    setImageUri: (state, action: PayloadAction<string>) => {
      state.imageUri = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<ActiveTabType>) => {
      state.activeTab = action.payload;
    },
    setTemp: (state)=>{
      state.temp++
    }
  },
});

export const {setIsLoggedIn, setIsWaiting, setAccount, setImageUri, setActiveTab, setTemp} =
  generalSlice.actions;
export default generalSlice.reducer;
