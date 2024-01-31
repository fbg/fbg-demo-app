// AddEmployeeFramerStepOne.tsx

import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

const AddEmployeeFramerStepOne: React.FC<{ goToNextStep: () => void }> = ({ goToNextStep }) => {
  const { register, setFocus } = useFormContext();

  useEffect(() => {
    // Focus the input field when the component is first rendered
    setFocus('name');
  }, [setFocus]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Advance to next step when Tab is pressed
    if (e.key === 'Tab') {
      e.preventDefault(); // Prevent the default tabbing behavior
      goToNextStep();
    }
  };

  return (
    <div className="flex flex-col">
      <input
        {...register('name')}
        onKeyDown={handleKeyDown}
        placeholder="Navn"
        className="border-2 border-gray-300 p-2 rounded-md"
      />
    </div>
  );
};

export default AddEmployeeFramerStepOne;
