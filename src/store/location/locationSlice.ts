import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { defaultLocation } from 'utils/locationUtils';

export interface LocationState {
  latitude: string;
  longitude: string;
  timestamp: string;
}

export const sliceName = 'locationSlice';

const initialState: LocationState = {
  timestamp: '0',
  latitude: defaultLocation.coords.latitude.toString(),
  longitude: defaultLocation.coords.longitude.toString(),
};

const locationSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state = action.payload;
    },
  },
});

export default locationSlice;
