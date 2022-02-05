import React from 'react';
import { Link } from 'react-router-dom';

const Content: React.FC = () => (
  <div>
    <h1>content page</h1>
    <Link to="/home">Click to go to Home</Link>
  </div>
);

export default Content;
