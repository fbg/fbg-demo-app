// AddEmployeeFramerStepTwo.tsx

import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const AddEmployeeFramerStepTwo: React.FC<{ animationCompleted: boolean, goToNextStep: () => void }> = ({ animationCompleted, goToNextStep }) => {
  const { register, setFocus } = useFormContext();

  useEffect(() => {
    // Focus the input only if the animation has completed
    if (animationCompleted) {
      setFocus('position');
    }
  }, [animationCompleted, setFocus]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Advance to next step when Tab is pressed and the animation is completed
    if (e.key === 'Tab' && animationCompleted) {
      e.preventDefault(); // Prevent the default tabbing behavior
      goToNextStep();
    }
  };

  return (
    <div className="flex flex-col">
      <p className="text-3xl font-bold mb-[25px] text-center">Angiv deltagerens titel</p>
      <input
        {...register('position')}
        onKeyDown={handleKeyDown}
        placeholder="Titel"
        className="transition duration-200 bg-white border-2 px-[20px] md:px-[30px] py-2.5 rounded-full drop-shadow-lg"
      />
    </div>
  );
};

export default AddEmployeeFramerStepTwo;
