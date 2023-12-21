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
import TaskEdit from '../Page/Dashboard/Task/TaskEdit';

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
        path: 'task/edit/:id',
        element: <TaskEdit></TaskEdit>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/tasks/edit/${params.id}`),
      },
    ],
  },
]);

export default Router;
