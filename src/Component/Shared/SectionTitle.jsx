import React from 'react';
import { FcBiohazard, FcBrokenLink } from 'react-icons/fc';

const SectionTitle = ({ heading }) => {
  return (
    <div className="mx-auto text-center lg:w-4/12 w-3/5 my-8">
      <h3 className="text-2xl uppercase font-serif  py-4">{heading}</h3>
      <div className="flex gap-5 items-center justify-center">
        <h2 className="flex">
          <FcBrokenLink />
          <FcBrokenLink />
          <FcBrokenLink />
          <FcBrokenLink />
        </h2>
        <h2>
          <FcBiohazard />
        </h2>
        <h2 className="flex">
          <FcBrokenLink />
          <FcBrokenLink />
          <FcBrokenLink />
          <FcBrokenLink />
        </h2>
      </div>
    </div>
  );
};

export default SectionTitle;
