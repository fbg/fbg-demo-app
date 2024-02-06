import React from "react";
import "@/app/css/progressbar.css";

interface ProgressProps {
  step: number;
}

const AddEmployeeProgressBar: React.FC<ProgressProps> = ({ step }) => {
  return (
    <div className="px-[60px] md:px-0">
        <div className="progressbar w-full max-w-[500px] progressline mx-auto">
        <div className="bg-portalcolor-500 py-[1px] rounded-full">
            <div className={`transition-all duration-200 ease-out progressLine h-[2px] bg-portalcolor rounded-full ${ step > 1 ? (step > 2 ? 'w-full' : 'w-1/2') : 'w-0' }`}></div>
        </div>
            <ul className="text-[10px] text-link-blue h-10 list-none pl-0 p-0 relative">
            <li className=" inline w-[30%] text-center absolute pt-6 pb-2 progressBarStep left-[0%]">
                NAVN
            </li>
            <li className={`transition-all duration-200 inline w-[30%] text-center absolute pt-6 pb-2 progressBarStep left-[50%] ${ step < 2 ? 'text-gray-200 progressBarStep-faded' : 'text-black' }`}>
                TITEL
            </li>
            <li className={`transition-all duration-200 inline w-[30%] text-center absolute pt-6 pb-2 progressBarStep left-[100%] ${ step < 3 ? 'text-gray-200 progressBarStep-faded' : 'text-black' }`}>
                GEM OG LUK
            </li>
            </ul>
        </div>
    </div>
  );
};

export default AddEmployeeProgressBar;