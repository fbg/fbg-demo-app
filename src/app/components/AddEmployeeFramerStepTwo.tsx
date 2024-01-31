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
      <input
        {...register('position')}
        onKeyDown={handleKeyDown}
        placeholder="Titel"
        className="border-2 border-gray-300 p-2 rounded-md"
      />
      {/* ... rest of your component ... */}
    </div>
  );
};

export default AddEmployeeFramerStepTwo;
