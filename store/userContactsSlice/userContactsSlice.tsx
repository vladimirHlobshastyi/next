import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { changeContactsPayload } from "./userContactsSlice.types";



const initialState = {
  fullName: '',
  email: '',
  phone: ''
}

const userContactsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    changeContacts(state, action: PayloadAction<changeContactsPayload>) {
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    }
  },
  extraReducers:
    (builder) => {
      /*  builder.addCase(loginThunk.pending, (state) => { state.isLoading = true })
       builder.addCase(loginThunk.fulfilled, (state, PayloadAction) => {
         state.token = PayloadAction.payload.getToken
         state.isAuth = PayloadAction.payload.isAuthResponse
         state.isLoading = false
       })
       builder.addCase(loginThunk.rejected, (state) => { state.isLoading = false })
    */
    },

});

export const { changeContacts } = userContactsSlice.actions;
export const fullNameState = (state: RootState) => state.userContacts.fullName
export const emailameState = (state: RootState) => state.userContacts.email
export const phoneState = (state: RootState) => state.userContacts.phone



export default userContactsSlice.reducer;


