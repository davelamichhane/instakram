import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ActiveTabType = 'home' | 'search' | 'reels' | 'shop' | 'profile' | 'guest';

export type GeneralState = {
  isLoggedIn: boolean;
  isWaiting:boolean;
  activeTab: ActiveTabType;
  temp: number;
};

const initialState: GeneralState = {
  isLoggedIn: false,
  isWaiting:false,
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
    setActiveTab: (state, action: PayloadAction<ActiveTabType>) => {
      state.activeTab = action.payload;
    },
    setTemp: (state)=>{
      state.temp++
    }
  },
});

export const {setIsLoggedIn, setIsWaiting,  setActiveTab, setTemp} =
  generalSlice.actions;
export default generalSlice.reducer;
