import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import type { RootState, AppDispatch } from 'store';
import { fetchLocation } from 'store/location/locationThunks';
import {
  onLoginSuccess,
  onLoginFailure,
  onLogout,
} from 'store/auth/authActions';
import Container from '@mui/material/Container';
import { useComponentFirstMount } from 'hooks';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useSelector((state: RootState) => state.locationState);
  console.log('LOCATION: ', location);

  useComponentFirstMount(() => {
    dispatch(fetchLocation());
  });

  return (
    <Container>
      <h1>Home page</h1>
      <Link to="/content">Content</Link>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
        buttonText="Login to Athan Web"
        onSuccess={(r) => dispatch(onLoginSuccess(JSON.stringify(r)))}
        onFailure={() => dispatch(onLoginFailure())}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
      />
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
        buttonText="Logout of Athan Web"
        onLogoutSuccess={() => dispatch(onLogout())}
      />
    </Container>
  );
};

export default Home;
