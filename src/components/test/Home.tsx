import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { LocationContext } from '../context/LocationContext';

const Home: React.FC = () => {
  const { latitude, longitude } = useContext(LocationContext);
  return (
    <Container>
      <h1>Home Page</h1>
      <h2>Latitude: {latitude}</h2>
      <h2>Longitude: {longitude}</h2>
    </Container>
  );
};

export default Home;
