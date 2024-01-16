import React from 'react';
import useStore from '@/store/store';

const GroupingButton: React.FC = () => {
  const {isGrouped,toggleGrouping} = useStore();

  return (
    <button 
    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    onClick={toggleGrouping}>
      {isGrouped ? 'Sorter alfabetisk' : 'Sorter efter status'}
    </button>
  );
};

export default GroupingButton;
