// AddEmployeeFramerStepTwo.tsx

import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';


const AddEmployeeFramerStepTwo: React.FC<{ animationCompleted: boolean }> = ({ animationCompleted }) => {
  const { register, setFocus } = useFormContext();

  useEffect(() => {
    // Focus the input only if the animation has completed
    if (animationCompleted) {
      setFocus('position');
    }
  }, [animationCompleted, setFocus]);

  return (
    <div className="flex flex-col">
      <p className="text-3xl font-bold mb-[25px] text-center">Angiv deltagerens titel</p>
      <input
        {...register('position')}
        placeholder="Titel"
        className="transition duration-200 bg-white border-2 px-[20px] md:px-[30px] py-2.5 rounded-full drop-shadow-lg"
      />
    </div>
  );
};

export default AddEmployeeFramerStepTwo;
