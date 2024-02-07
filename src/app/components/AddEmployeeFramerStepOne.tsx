// AddEmployeeFramerStepOne.tsx

import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const AddEmployeeFramerStepOne: React.FC = () => {
  const { register, setFocus } = useFormContext();

  useEffect(() => {
    // Focus the input field when the component is first rendered
    setFocus('name');
  }, [setFocus]);

  return (
    <div className="flex flex-col">
      <p className="text-3xl font-bold mb-[25px] text-center">Angiv deltagerens navn</p>
      <input
        {...register('name')}
        placeholder="Navn"
        className="transition duration-200 bg-white border-2 px-[20px] md:px-[30px] py-2.5 rounded-full drop-shadow-lg"
      />
    </div>
  );
};

export default AddEmployeeFramerStepOne;
