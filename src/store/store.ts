import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './location/locationReducer';
import authReducer from './auth/authReducer';

const store = configureStore({
  reducer: {
    locationState: locationReducer,
    authState: authReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
