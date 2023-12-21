import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="h-[70vh] bg-green-300">
      <Link to="/login">
        <button className="btn btn-primary">Let’s Explore</button>
      </Link>
    </div>
  );
};

export default Banner;
