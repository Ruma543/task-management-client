import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import ErrorPage from '../Page/ErrorPage/ErrorPage';
import Home from '../Page/Home/Home';
import Login from '../Page/Login/Login';
import Registration from '../Page/Registration/Registration';
import Dashboard from '../Page/Dashboard/Dashboard';
import Task from '../Page/Dashboard/Task/Task';
import Testtask from '../Page/Dashboard/Task/Testtask';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/register',
    element: <Registration></Registration>,
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'task',
        element: <Task></Task>,
      },
      {
        path: 'tasksssss',
        element: <Testtask></Testtask>,
      },
    ],
  },
]);

export default Router;
