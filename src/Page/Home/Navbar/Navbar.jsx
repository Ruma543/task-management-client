import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../../Hook/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'User Logout successfully',
          showConfirmButton: true,
        });

        navigate('/');
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong',
          showConfirmButton: true,
        });
        return;
      });
  };
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isActive
              ? 'text-red-700 underline lg:text-white font-semibold '
              : isPending
              ? 'pending lg:text-green'
              : ''
          }
        >
          Home
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive, isPending }) =>
                isActive
                  ? 'text-red-700 underline lg:text-white font-semibold '
                  : isPending
                  ? 'pending lg:text-green-300'
                  : ''
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink
          to="/contactUs"
          className={({ isActive, isPending }) =>
            isActive
              ? 'text-red-700 underline lg:text-white font-semibold '
              : isPending
              ? 'pending'
              : ''
          }
        >
          Contact Us
        </NavLink>
      </li>
    </>
  );

  const [fix, setFix] = useState(false);
  useEffect(() => {
    const setFixed = () => {
      if (window.scrollY > 400) {
        setFix(true);
      } else {
        setFix(false);
      }
    };
    window.addEventListener('scroll', setFixed);
    return () => {
      window.removeEventListener('scroll', setFixed);
    };
  }, []);

  return (
    <div className="">
      <div
        className={
          fix
            ? 'transition duration-150 ease-in-out h-20 lg:px-6 bg-blue-300 flex navbar   '
            : ' h-20 lg:bg-orange-400 bg-orange-200 flex navbar lg:px-6 '
        }
        style={{ backgroundColor: '#0a3d62' }}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 rounded-box shadow  text-black w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl lg:text-4xl text-white">
            <span className="text-green-700 text-xl lg:text-4xl">Task</span>{' '}
            Manager
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div className="flex items-center gap-5">
                <div>
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="lg:w-10 w-7  rounded-full ">
                      <img src={user.photoURL} />
                    </div>
                  </label>
                  <p className="text-xs w-full text-white">
                    {user.displayName}
                  </p>
                </div>
                {/* <button
                  onClick={handleLogOut}
                  className="lg:px-4 lg:py-3 py-1 px-2 bg-red-600 text-white"
                >
                  Sign Out
                </button> */}
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="lg:px-4 lg:py-3 px-2 py-1 bg-blue-600 text-white mr-5">
                login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
