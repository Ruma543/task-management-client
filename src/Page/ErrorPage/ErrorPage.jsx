import React from 'react';
import { Link } from 'react-router-dom';
const errImg = 'https://i.ibb.co/JzQGhq2/404-error-blog-1.png';
const ErrorPage = () => {
  return (
    <div className="lg:w-3/5 w-11/12 mx-auto">
      <img className="w-full lg:my-10 my-5" src={errImg} alt="" />
      <h3 className="text-center w-3/4 text-blue-600 font-semibold mx-auto mb-3">
        This page you are looking you are might have been removed had its name
        changed or temporarily unavailable.
      </h3>
      <div className="flex justify-center">
        <Link to="/">
          <button className="text-white bg-blue-700 px-4 py-3 rounded-lg hover:bg-blue-800">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
