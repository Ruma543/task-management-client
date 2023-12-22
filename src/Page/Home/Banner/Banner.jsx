import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
const img = 'https://i.ibb.co/qg4mqxW/1-8-G1v-A7egoxr-L4-Bb7-RAgn-PQ.jpg';
const Banner = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="lg:h-[70vh] mx-auto lg:w-full grid lg:grid-cols-2 grid-cols-1 bg-blue-900">
      <div className="flex flex-col items-center justify-center">
        {' '}
        <h3
          data-aos="fade-up-left"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1000"
          className="text-white lg:text-3xl text-xl p-6 font-semibold text-center"
        >
          Excel in your tasks, meticulously organize your efforts, and
          relentlessly strive for self-improvement in life.
        </h3>
        <Link to="/login">
          <button
            style={{ backgroundColor: '#0a3d62' }}
            className="px-4 py-3 rounded-lg hover:bg-blue-400 text-white"
          >
            Let’s Explore
          </button>
        </Link>
      </div>
      <div
        className="flex justify-center items-center rounded-full my-7"
        style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }}
      ></div>
    </div>
  );
};

export default Banner;
