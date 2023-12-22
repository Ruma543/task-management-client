import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FcHome } from 'react-icons/fc';
import { FcAddressBook } from 'react-icons/fc';
import {
  FaContao,
  FaGithub,
  FaLinkedin,
  FaMessage,
  FaPhone,
  FaStamp,
  FaVoicemail,
} from 'react-icons/fa6';
import Swal from 'sweetalert2';
const ContactUs = () => {
  const form = useRef();
  const sendEmail = e => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_hvfjo8h',
        'template_fpkjr1s',
        e.target,
        'fJR_7t3flBiWDBu04'
      )
      .then(
        result => {
          console.log(result.text);
          // console.log('message sent');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'message send successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };
  return (
    <div className=" lg:w-3/4 w-11/12 mx-auto mb-10">
      <div className=" grid lg:grid-cols-2 grid-cols-1 gap-5 bg-blue-900 px-7 py-10 text-white">
        <div className="flex flex-col ">
          <h3 className="text-2xl font-semibold">Contact Information</h3>
          <h3 className="flex items-center text-left gap-3">
            <FcHome />
            176 W street name, Dhaka, Bangladesh
          </h3>
          <h3 className="flex items-center gap-3">
            <FcAddressBook />
            Email: info@task.manager.com
          </h3>
          <h3 className="flex items-center gap-3">
            <FaPhone />
            Telephone: +0088123-4566
          </h3>
        </div>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col lg:w-2/3 w-full mx-auto"
        >
          <h3 className="text-xl font-semibold flex items-center gap-3">
            <FaMessage /> Feel free to contact with us
          </h3>
          <label className="text-xl font-semibold">Name</label>
          <input
            className="w-full px-4 py-2 rounded-lg outline-none bg-white"
            type="text"
            name="users_name"
          />
          <label className="text-xl font-semibold">Email</label>
          <input
            className="w-full px-4 py-2 rounded-lg outline-none bg-white"
            type="email"
            name="users_email"
          />
          <label className="text-xl font-semibold">Message</label>
          <textarea
            className="w-full px-4 py-2 rounded-lg outline-none bg-white"
            name="message"
          />
          <input className="btn btn-primary my-4" type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
