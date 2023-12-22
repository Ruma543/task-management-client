import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import { useForm } from 'react-hook-form';
import GoogleLogin from './GoogleLogin';
import Swal from 'sweetalert2';
import img from '../../assets/login.jpg';
import toast from 'react-hot-toast';

const Login = () => {
  const [isHovered, setIsHovered] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { logUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(logUser);
  const onSubmit = async data => {
    logUser(data.email, data.password)
      .then(result => {
        const user = result.user;
        console.log(user);
        reset();
        toast.success('User login Successfully!');
        // Swal.fire({
        //   position: 'middle-end',
        //   icon: 'success',
        //   title: 'user login successfully',
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
        navigate('/dashboard');
        // navigate(location.state ? location.state : '/');
      })
      .catch(error => {
        toast.error('User added Successfully!');
        // Swal.fire({
        //   position: 'middle-end',
        //   icon: 'error',
        //   title: 'Please login with verified password',
        //   showConfirmButton: false,
        //   timer: 1500,
        // });
      });
    console.log(data);
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div
            style={{
              // backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              borderRadius: '50%',
              overflow: 'hidden',
              transition: 'transform 0.3s ease-in-out',
              transform: isHovered ? 'scale(.9)' : 'scale(.7)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-center lg:text-left "
          >
            <img src={img} alt="" />
          </div>
          <div className="card  bg-blue-500 shrink-0 w-full max-w-sm shadow-2xl ">
            <form className="card-body " onSubmit={handleSubmit(onSubmit)}>
              <p className=" text-lg text-white">
                New in our Website? please
                <Link to="/register" className="text-white underline px-3">
                  Register
                </Link>
              </p>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register('email', { required: true })}
                  placeholder="enter your email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register('password', { required: true })}
                  className="input input-bordered"
                  required
                />
                {/* <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary hover:bg-blue-700"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
            <GoogleLogin></GoogleLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
