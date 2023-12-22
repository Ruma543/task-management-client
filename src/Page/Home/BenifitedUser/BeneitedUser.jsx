import React, { useEffect } from 'react';
import img from '../../../assets/hr.jpg';
import img1 from '../../../assets/user1.jpg';
import img2 from '../../../assets/user2.jpg';
import img3 from '../../../assets/user.3.png';
import img4 from '../../../assets/user4.png';
import img5 from '../../../assets/user5.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SectionTitle from '../../../Component/Shared/SectionTitle';
const BenefitedUser = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <SectionTitle heading="User opinions about us"></SectionTitle>
      <div className="lg:h-[70vh] bg-blue-900 py-7 px-8 w-11/12 mx-auto my-6">
        <div className="grid lg:grid-cols-3 grid-cols-1 h-11/12 my-auto gap-4">
          <div
            data-aos="flip-up"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
            className="grid grid-cols-2 gap-3  bg-white mt-4  py-4 rounded-r-3xl rounded-b-3xl"
          >
            <div className="flex flex-col justify-center items-center">
              <img className="w-20 h-20 rounded-lg" src={img} alt="" />
              <h3>Rubina Alam</h3>
              <h3 className="text-blue-900 font-semibold">Web Developer</h3>
            </div>
            <div className="flex items-center pr-4">
              <h3 className="text-left text-sm">
                Tasks sync seamlessly across devices. It's a time-saver for
                managing work and personal tasks.",
              </h3>
            </div>
          </div>
          <div
            data-aos="flip-up"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
            className="grid grid-cols-2 gap-3  bg-white mt-4  py-4 rounded-r-3xl rounded-b-3xl"
          >
            <div className="flex flex-col justify-center items-center">
              <img className="w-20 h-20 rounded-lg" src={img1} alt="" />
              <h3>Donald Luice</h3>
              <h3 className="text-blue-900 font-semibold">Banker</h3>
            </div>
            <div className="flex items-center pr-4">
              <h3 className="text-left text-sm">
                Great task manager! The user interface is intuitive, and it
                helps me stay organized efficiently.
              </h3>
            </div>
          </div>
          <div
            data-aos="flip-up"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
            className="grid grid-cols-2 gap-3  bg-white mt-4  py-4 rounded-r-3xl rounded-b-3xl"
          >
            <div className="flex flex-col justify-center items-center">
              <img className="w-20 h-20 rounded-lg" src={img2} alt="" />
              <h3>Robert Smith</h3>
              <h3 className="text-blue-900 font-semibold">Corporate Officer</h3>
            </div>
            <div className="flex items-center pr-4">
              <h3 className="text-left text-sm">
                Clean design and easy-to-use. Some keyboard shortcuts would
                enhance the user experience.
              </h3>
            </div>
          </div>
          <div
            data-aos="flip-up"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
            className="grid grid-cols-2 gap-3  bg-white mb-8  py-4 rounded-r-3xl rounded-b-3xl"
          >
            <div className="flex flex-col justify-center items-center">
              <img className="w-20 h-20 rounded-lg" src={img3} alt="" />
              <h3>Sirin Jaman</h3>
              <h3 className="text-blue-900 font-semibold">Teacher</h3>
            </div>
            <div className="flex items-center pr-4">
              <h3 className="text-left text-sm">
                Task manager works well, but occasional lag when loading tasks.
                Optimization would be appreciated.
              </h3>
            </div>
          </div>
          <div
            data-aos="flip-up"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
            className="grid grid-cols-2 gap-3  bg-white mb-8   py-4 rounded-r-3xl rounded-b-3xl"
          >
            <div className="flex flex-col justify-center items-center">
              <img className="w-20 h-20 rounded-lg" src={img4} alt="" />
              <h3>Amina Sultana</h3>
              <h3 className="text-blue-900 font-semibold">Backend Developer</h3>
            </div>
            <div className="flex items-center pr-4">
              <h3 className="text-left text-sm">
                Task manager exceeded my expectations. Regular updates with new
                features would be fantastic!
              </h3>
            </div>
          </div>
          <div
            data-aos="flip-up"
            data-aos-offset="200"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
            className="grid grid-cols-2 gap-3  bg-white mb-8  py-4 rounded-r-3xl rounded-b-3xl"
          >
            <div className="flex flex-col justify-center items-center">
              <img className="w-20 h-20 rounded-lg" src={img5} alt="" />
              <h3>Rizvi Zarin</h3>
              <h3 className="text-blue-900 font-semibold">Doctor</h3>
            </div>
            <div className="flex items-center pr-4">
              <h3 className="text-left text-sm">
                User-friendly interface, but task sorting options could be more
                robust. Overall, a solid tool.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitedUser;
