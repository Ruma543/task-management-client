import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTasks } from 'react-icons/fa';
import { FcHome } from 'react-icons/fc';
const UserMenu = ({ open }) => {
  const userMenu = [
    {
      Name: 'Task',
      path: '/dashboard/task',
      icon: <FaTasks />,
    },
    // {
    //   Name: 'Tasksss',
    //   path: '/dashboard/tasksssss',
    //   icon: <FaTasks />,
    // },
    {
      Name: 'Home',
      path: '/',
      icon: <FcHome />,
    },
  ];
  return (
    <div>
      <ul className="pt-6">
        {userMenu.map((link, index) => (
          <NavLink
            to={link.path}
            key={link?.path}
            sx={{ color: '#0a3d62' }}
            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
              ${link.gap ? 'mt-9' : 'mt-2'} ${
              index === 0 && 'bg-light-white'
            } `}
          >
            <span>{link.icon}</span>
            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              {link.Name}
            </span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default UserMenu;
