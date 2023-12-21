import React from 'react';
import { Link } from 'react-router-dom';
const img = 'https://i.ibb.co/jHVxhpn/task-management-hero-banner.png';
const Banner = () => {
  return (
    <div
      className="h-[70vh]"
      style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }}
    >
      <Link to="/login">
        <button className="btn btn-primary">Let’s Explore</button>
      </Link>
    </div>
  );
};

export default Banner;
