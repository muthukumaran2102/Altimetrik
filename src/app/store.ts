import { configureStore } from '@reduxjs/toolkit';
import carReducer from '../features/carsSlice';
export const store = configureStore({
  reducer: {
    carReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;