import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const Content: React.FC = () => (
  <Container>
    <h1>Content page</h1>
    <Link to="/home">Click to go to Home</Link>
  </Container>
);

export default Content;
