import React from 'react';
import useAuth from '../../Hook/useAuth';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../Hook/useAxiosPublic';
import Swal from 'sweetalert2';

// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_API;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
// https://api.imgbb.com/1/upload
const Registration = () => {
  const { createUser, profileUpdate } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async data => {
    console.log(data);
    // const imageFile = { image: data.image[0] };
    // const imgRes = await axios.post(image_hosting_api, imageFile, {
    //   headers: {
    //     'content-type': 'multipart/form-data',
    //   },
    // });
    // console.log(imgRes.data);
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        // console.log(imgRes.data.data.display_url);
        profileUpdate(data.name, data.image).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            // image: imgRes.data.data.display_url,
            image: data.image,
            occupation: data.occupation,
          };
          console.log(userInfo);
          axiosPublic.post('/users', userInfo).then(res => {
            if (res.data.insertedId) {
              reset();
              // return alert('added successfuly');
              Swal.fire({
                position: 'middle-end',
                icon: 'success',
                title: 'User add successfully',
                showConfirmButton: false,
                timer: 1500,
              });
              navigate('/');
            }
          });
        });
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'user Information  is missing!',
          showConfirmButton: true,
        });
      });
  };
  return (
    <div className="w-2/3 mx-auto my-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-5 py-6 rounded-lg text-white  bg-blue-500"
        // style={{ backgroundColor: '#0a3d62' }}
      >
        <p className="text-center text-2xl font-semibold">
          Already Register Please{' '}
          <Link to="/login" className="text-white underline">
            Login
          </Link>{' '}
        </p>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 items-center ">
          <div className="form-control w-full  space-y-3">
            <label className="label">
              <span className="label-text font-semibold text-lg">
                User Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Name"
              {...register('name', { required: true })}
              required
              className=" w-full px-6 py-3 rounded-lg  text-black outline-none"
            />
            {errors.name && (
              <span className="text-red-400">Name is required</span>
            )}
          </div>
          <div className="form-control w-full  space-y-3">
            <label className="label">
              <span className="label-text font-semibold text-lg">
                User Email
              </span>
            </label>
            <input
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
              required
              className=" w-full text-black px-6 py-3 rounded-lg outline-none"
            />
            {errors.email && (
              <span className="text-red-400">Email is required</span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 items-center ">
          <div className="form-control w-full  space-y-3">
            <label className="label">
              <span className="label-text font-semibold text-lg">
                User Occupation
              </span>
            </label>
            <select
              {...register('occupation', { required: true })}
              className=" w-full px-6 py-3 text-black rounded-lg outline-none"
              name="occupation"
              id=""
              defaultValue="default"
            >
              <option disabled value="default"></option>
              <option value="developer">Developer</option>
              <option value="corporate officer">Corporate Officer </option>
              <option value="professionals">Professionals</option>
              <option value="banker">Banker</option>
            </select>
            {errors.occupation && (
              <span className="text-red-400">Occupation is required</span>
            )}
          </div>
          <div className="form-control w-full  space-y-3">
            <label className="label">
              <span className="label-text font-semibold text-lg">Password</span>
            </label>
            <input
              type="password"
              {...register('password', {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
              })}
              placeholder="Password"
              {...register('password', { required: true })}
              required
              className=" w-full text-black px-6 py-3 rounded-lg outline-none"
            />
            {errors.password && (
              <span className="text-red-400">Password is required</span>
            )}
            {errors.password?.type === 'minLength' && (
              <span className="text-red-400">
                Password must be 6 characters
              </span>
            )}
            {errors.password?.type === 'pattern' && (
              <span className="text-red-400">
                Password must be one uppercase & one special character
              </span>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 items-center ">
          <div className="form-control w-full  space-y-3">
            <label className="label">
              <span className="label-text font-semibold text-lg">Image</span>
            </label>
            <input
              type="text"
              placeholder="image"
              {...register('image', { required: true })}
              required
              className=" w-full px-6 py-3 rounded-lg  text-black outline-none"
            />
            {errors.image && (
              <span className="text-red-400">Image is required</span>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          {' '}
          <button
            className="bg-blue-900 my-4 px-3 py-2 rounded-lg text-center text-white hover:bg-blue-700"
            type="submit"
          >
            Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
