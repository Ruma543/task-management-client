import axios from 'axios';
import React from 'react';
const axiosPublic = axios.create({
  baseURL: 'https://task-management-server-ochre.vercel.app',
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
