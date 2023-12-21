import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../Hook/useAuth';
import { useForm } from 'react-hook-form';
import GoogleLogin from './GoogleLogin';

const Login = () => {
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
        // Swal.fire({
        //   position: 'middle-end',
        //   icon: 'success',
        //   title: 'user login successfully',
        //   showConfirmButton: false,
        //   timer: 1500,
        // });

        navigate(location.state ? location.state : '/');
      })
      .catch(error => {
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
      <h3>login</h3>
      <Link to="/register">
        <button className="btn btn-primary">Registration</button>
      </Link>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <p className=" text-lg">
                New in our Website? please
                <Link to="/register" className="text-blue-700">
                  {' '}
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
                <button className="btn btn-primary" type="submit">
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
