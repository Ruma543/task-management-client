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
import PrivateRoute from './PrivateRoute';

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
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'task',
        element: (
          <PrivateRoute>
            <Task></Task>
          </PrivateRoute>
        ),
      },
      {
        path: 'task/edit/:id',
        element: (
          <PrivateRoute>
            <TaskEdit></TaskEdit>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/tasks/edit/${params.id}`),
      },
    ],
  },
]);

export default Router;
