import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { GoogleLogin } from '@react-oauth/google';
import Container from '@mui/material/Container';
import { useAuthContext } from 'contexts/authContext';

const Home: React.FC = () => {
  const { googleAuth, onLoginSuccess, onLoginFailure, onClickLogout } =
    useAuthContext();

  console.log(googleAuth);

  return (
    <Container>
      <h1>Home page</h1>
      <Link to="/content">Content</Link>
      <br />
      <Link to="/times">Times</Link>
      <br />
      <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginFailure} />
      <br />
      <br />
      <Button onClick={onClickLogout}>Logout</Button>
    </Container>
  );
};

export default Home;
