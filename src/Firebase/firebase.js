import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // apiKey: 'AIzaSyBgZvy5ahOUK3XJsMwTuWWrd4nxvYdrSls',
  // authDomain: 'task-management-client-4195e.firebaseapp.com',
  // projectId: 'task-management-client-4195e',
  // storageBucket: 'task-management-client-4195e.appspot.com',
  // messagingSenderId: '569103827427',
  // appId: '1:569103827427:web:939ff0eb352d6fd17260d6',
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
