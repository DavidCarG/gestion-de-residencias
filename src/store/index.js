import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import menuReducer from './menuSlice'; // Import the new slice

const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer, 
  },
});

export default store;
