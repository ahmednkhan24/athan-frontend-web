import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

export interface AuthState {
  isLoggedIn: boolean;
  isErrored: boolean;
  googleAuth?: {
    userInfo: GoogleLoginResponse['profileObj'];
    authInfo: GoogleLoginResponse['tokenObj'];
  };
}

export const sliceName = 'authSlice';

const initialState: AuthState = {
  isLoggedIn: false,
  isErrored: false,
  googleAuth: undefined,
};

const authSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    onLoginSuccess: (state, action: PayloadAction<string>) => {
      // pass the payload as a stringified JSON object to avoid sending a non-serializable value
      const payload: GoogleLoginResponse | GoogleLoginResponseOffline =
        JSON.parse(action.payload);

      if (payload.code) {
        // GoogleLoginResponseOffline
        state.isLoggedIn = false;
        state.isErrored = true;
        state.googleAuth = undefined;
        return;
      }

      const googleResponse = payload as GoogleLoginResponse;
      state.isLoggedIn = true;
      state.isErrored = false;
      state.googleAuth = {
        authInfo: googleResponse.tokenObj,
        userInfo: googleResponse.profileObj,
      };
    },
    onLoginFailure: (state) => {
      state.isLoggedIn = false;
      state.isErrored = true;
      state.googleAuth = undefined;
    },
    onLogout: (state) => {
      state.isLoggedIn = false;
      state.isErrored = false;
      state.googleAuth = undefined;
    },
  },
});

export default authSlice;
