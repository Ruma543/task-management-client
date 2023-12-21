import React, { useState } from 'react';
import useAuth from '../../Hook/useAuth';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { FcApproval } from 'react-icons/fc';
import UserMenu from '../../Menu/UserMenu';

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const handleLogOut = () => {
    logOut()
      .then(() => {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'User Logout successfully',
        //   showConfirmButton: true,
        // });

        navigate('/');
      })
      .catch(error => {
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Something went wrong',
        //   showConfirmButton: true,
        // });
        return;
      });
  };
  return (
    <div className="w-full flex">
      <div
        className={` ${
          open ? 'w-72' : 'w-20 '
        } h-screen p-5  pt-8 relative duration-300`}
        style={{ backgroundColor: '#0a3d62' }}
      >
        <FaArrowLeft
          className={`absolute cursor-pointer -right-3 top-9 w-5 h-5 bg-blue-600
            rounded-full text-white  ${!open && 'rotate-180'}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          {/* logo */}
          <FcApproval
            className={`cursor-pointer duration-500 ${
              open && 'rotate-[360deg]'
            }`}
          />

          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && 'scale-0'
            }`}
          >
            Dashboard
          </h1>
        </div>
        {user ? <UserMenu open={open}></UserMenu> : ''}
        <button className="text-white btn btn-primary" onClick={handleLogOut}>
          Logout
        </button>
      </div>
      <div className="h-screen w-4/5 lg:w-11/12 mx-auto px-1  lg:p-7">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <h3 className="text-blue-900 text-2xl font-semibold">
            Hello {user.displayName}
          </h3>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="lg:w-10 w-7  rounded-full ">
              <img src={user.photoURL} />
            </div>
          </label>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;