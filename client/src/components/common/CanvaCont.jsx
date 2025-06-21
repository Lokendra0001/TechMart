import React from "react";

function CanvaCont({ children, classname = "" }) {
  return (
    <div
      className={`max-w-[1400px] min-h-[605px] px-2 bg-indigo-100/45 relative overflow-hidden ${classname}`}
    >
      {/* Decorative top left shape */}
      <div className="absolute top-[-30px] left-[-30px] w-32 h-32 bg-blue-200 rounded-xl rotate-12 opacity-80"></div>

      {/* Decorative bottom left shape */}
      <div className="absolute bottom-[-30px] left-[-20px] w-40 h-40 bg-blue-300  rounded-xl rotate-45 opacity-80"></div>

      {/* Decorative top right shape */}
      <div className="absolute top-[-20px] right-[-18px] w-36 h-36 bg-sky-200  rounded-xl -rotate-12 opacity-80"></div>

      <div className="relative z-10 md:px-7 py-5 flex justify-center items-center min-h-[605px]">
        {children}
      </div>
    </div>
  );
}

export default CanvaCont;
