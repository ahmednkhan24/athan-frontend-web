import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentLocationAsync } from 'utils/locationUtils';
import { sliceName } from './locationSlice';
import { setLocation } from './locationActions';

export const fetchLocation = createAsyncThunk(
  `${sliceName}/fetchLocation`,
  async (_payload, { dispatch }) => {
    const location = await getCurrentLocationAsync();
    dispatch(
      setLocation({
        timestamp: location.timestamp.toString(),
        latitude: location.coords.latitude.toString(),
        longitude: location.coords.longitude.toString(),
      })
    );
  }
);
