import React from 'react';
import useStore from '@/store/store';

const BTNgrouping: React.FC = () => {
  const {isGrouped,toggleGrouping} = useStore();

  return (
    <button 
    className="transition duration-200 text-white bg-blue-700 hover:bg-black border-2 border-blue-700 hover:border-black hover:text-white px-5 py-2.5 rounded-full"
    onClick={toggleGrouping}
    >
      {isGrouped ? 'Sorter alfabetisk' : 'Sorter efter status'}
    </button>
  );
};

export default BTNgrouping;
