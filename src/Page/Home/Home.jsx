import React from 'react';
import useAuth from '../../Hook/useAuth';
import Banner from './Banner/Banner';

const Home = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <Banner></Banner>
    </div>
  );
};

export default Home;
