import React from 'react';
import { PacmanLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white/80 z-[9999]">
      <PacmanLoader color="#9333ea" size={25} />
    </div>
  );
};

export default Spinner;
