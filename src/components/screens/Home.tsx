import React, { useContext, useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Container from 'react-bootstrap/Container';
import { LocationContext } from '../context/LocationContext';

const Home: React.FC = () => {
  const { latitude, longitude } = useContext(LocationContext);
  const [googleData, setGoogleData] = useState({});

  const googleLoginCallback = (response: any) => {
    console.log('logged in!', response);
    setGoogleData(response);
  };

  const googleLogoutCallback = () => {
    console.log('logged out!');
    setGoogleData({});
  };

  return (
    <Container>
      <h1>Home Page</h1>
      <h2>Latitude: {latitude}</h2>
      <h2>Longitude: {longitude}</h2>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
        buttonText="Login to Athan Web"
        onSuccess={googleLoginCallback}
        onFailure={googleLoginCallback}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
      />
      <br />
      <br />
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
        buttonText="Logout of Athan Web"
        onLogoutSuccess={googleLogoutCallback}
      />
      <br />
      <br />
      <div>{JSON.stringify(googleData)}</div>
    </Container>
  );
};

export default Home;
