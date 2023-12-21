import React from 'react';
import useAuth from '../../Hook/useAuth';
import Banner from './Banner/Banner';
import Footer from './Footer/Footer';
import BenefitedUser from './BenifitedUser/BeneitedUser';

const Home = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <Banner></Banner>
      <BenefitedUser></BenefitedUser>
      <Footer></Footer>
    </div>
  );
};

export default Home;
