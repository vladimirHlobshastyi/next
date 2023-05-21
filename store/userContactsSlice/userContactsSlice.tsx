import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { changeAdressPayload, changeContactsPayload } from './userContactsSlice.types';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  street: '',
  houseNumber: '',
  apartmentNumber: '',
};

const userContactsSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeContacts(state, action: PayloadAction<changeContactsPayload>) {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    changeAdress(state, action: PayloadAction<changeAdressPayload>) {
      state.city = action.payload.city;
      state.street = action.payload.street;
      state.houseNumber = action.payload.houseNumber;
      if (action.payload.apartmentNumber.length > 0) {
        state.apartmentNumber = action.payload.apartmentNumber;
      }
    },
  },
  extraReducers: (builder) => {},
});

export const { changeContacts, changeAdress } = userContactsSlice.actions;
export const fullNameState = (state: RootState) => state.userContacts.fullName;
export const emailameState = (state: RootState) => state.userContacts.email;
export const phoneState = (state: RootState) => state.userContacts.phone;
export const cityOfUserState = (state: RootState) => state.userContacts.city;
export const streetOfUserState = (state: RootState) => state.userContacts.street;
export const houseNumberOfUserState = (state: RootState) => state.userContacts.houseNumber;
export const apartmentNumberOfUserState = (state: RootState) => state.userContacts.apartmentNumber;

export default userContactsSlice.reducer;
