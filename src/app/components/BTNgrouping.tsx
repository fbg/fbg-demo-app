import React from 'react';
import useStore from '@/store/store';

const BTNgrouping: React.FC = () => {
  const {isGrouped,toggleGrouping} = useStore();

  return (
    <button 
    className="min-w-[175px] transition duration-200 text-black bg-white hover:bg-black border-2 border-black drop-shadow-lg md:hover:border-black md:hover:text-white px-5 py-2.5 rounded-full"
    onClick={toggleGrouping}
    >
      {isGrouped ? 'Sorter alfabetisk' : 'Sorter efter status'}
    </button>
  );
};

export default BTNgrouping;
