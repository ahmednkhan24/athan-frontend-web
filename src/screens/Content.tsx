import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Salahs from 'components/salahs';

const Content: React.FC = () => {
  return (
    <Container>
      <h1>content page</h1>
      <Link to="/">Home</Link>
      <Salahs />
    </Container>
  );
};

export default Content;
