import React from 'react';
import { Link } from 'react-router-dom';

const Top: React.FC = () => {
  return (
    <>
      TopPage
      <Link to="/">Home</Link>
      <Link to="/edit">edit</Link>
    </>
  );
};

export default Top;
