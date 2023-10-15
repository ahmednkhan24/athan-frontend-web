import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Prayers from 'components/prayers';

const Content: React.FC = () => {
  return (
    <Container>
      <h1>content page</h1>
      <Link to="/">Home</Link>
      <Prayers />
    </Container>
  );
};

export default Content;
