import { AiOutlineHome, AiOutlinePhone } from 'react-icons/ai';
import {
  AiOutlineMail,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="" style={{ backgroundColor: '#0a3d62' }}>
      <div className="px-10 py-7 grid lg:grid-cols-2 grid-cols-1 ">
        <div>
          <h2 className=" text-xl lg:text-4xl my-5 text-white">
            <span
              className="text-xl lg:text-4xl text-white"
              // style={{ color: '#0a3d62' }}
            >
              <span className="text-green-400"> Task</span> Manager
            </span>
          </h2>
          <div className="space-y-3">
            <h3 className="text-white border-b-2 w-1/3 py-3">Contact</h3>
            <h3 className="text-white flex gap-3">
              <AiOutlineHome></AiOutlineHome>{' '}
              <span>176 W street name, Dhaka, Bangladesh</span>
            </h3>
            <h3 className="text-white flex gap-3">
              <AiOutlinePhone></AiOutlinePhone>
              <span> Telephone: +0088123-4566</span>
            </h3>
            <h3 className="text-white flex gap-3">
              <AiOutlineMail></AiOutlineMail>{' '}
              <span>Email: info@task.manager.com</span>
            </h3>
          </div>
        </div>
        <div className="grid text-white lg:grid-cols-2 grid-cols-1">
          <div>
            <h3 className="text-xl font-bold my-5 border-b-2 w-2/3 py-3">
              Information
            </h3>
            <div className="space-y-3">
              <Link>
                {' '}
                <h3>About Us</h3>
              </Link>
              <Link to="/contact">
                <h3>Contact Us</h3>
              </Link>
              <Link>
                <h3>Service</h3>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold my-5 border-b-2 w-2/3 py-3">
              Help
            </h3>
            <div className="text-white flex">
              <h3 className="flex gap-4 text-2xl">
                {' '}
                <BsFacebook></BsFacebook>
                <AiOutlineTwitter></AiOutlineTwitter>
                <AiOutlineInstagram></AiOutlineInstagram>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
