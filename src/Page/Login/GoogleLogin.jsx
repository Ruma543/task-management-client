import React from 'react';
import useAuth from '../../Hook/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoogleLogin = () => {
    googleLogin()
      .then(result => {
        console.log(result.user);
        navigate(location.state ? location.state : '/');
      })
      .catch(error => {
        console.log(error);
        return;
      });
  };
  return (
    <div
      onClick={handleGoogleLogin}
      className="flex justify-center items-center my-3  "
    >
      <p className=" flex items-center justify-center text-xl gap-3">
        Login with
        <span className="text-2xl">
          <FcGoogle></FcGoogle>
        </span>
      </p>
    </div>
  );
};

export default GoogleLogin;
