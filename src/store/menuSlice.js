import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    selectedBtn: -1,
  },
  reducers: {
    setSelectedBtn: (state, action) => {
      state.selectedBtn = action.payload;
    },
  },
});

export const { setSelectedBtn } = menuSlice.actions;
export default menuSlice.reducer;
