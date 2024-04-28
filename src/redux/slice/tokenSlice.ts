import { createSlice } from '@reduxjs/toolkit';

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    accessToken: null
  },
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    clearAccessToken(state) {
      state.accessToken = null;
    }
  }
});

export const { setAccessToken, clearAccessToken } = tokenSlice.actions;
export default tokenSlice.reducer;
