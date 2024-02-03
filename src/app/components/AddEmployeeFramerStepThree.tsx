// components/AddEmployeeFramerStepThree.tsx

import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface AddEmployeeFramerStepThreeProps {
  setUserHasInteracted: (interacted: boolean) => void;
}

const AddEmployeeFramerStepThree: React.FC<AddEmployeeFramerStepThreeProps> = ({ setUserHasInteracted }) => {
  const [attendanceState, setAttendanceState] = useState<boolean | null>(null);
  const { setValue } = useFormContext();

  useEffect(() => {
    if (attendanceState !== null) {
      setValue('attendanceState', attendanceState);
    }
  }, [attendanceState, setValue]);

  const handleAttendanceChange = (state: boolean) => {
    setAttendanceState(state);
    setUserHasInteracted(true);
  };

  return (
    <div className="flex flex-col p-4">
      <p className="text-3xl font-bold mb-[25px] text-center">Trin 3: Angiv status for deltagelse</p>
      <div className="flex justify-center space-x-4">
        <button
          type="button"
          onClick={() => handleAttendanceChange(true)}
          className={`min-w-[150px] p-2 text-white rounded transition duration-200 ${attendanceState === true ? 'bg-green-500 disabled' : 'bg-green-300 hover:bg-green-700'}`}
        >
          Deltager
        </button>
        <button
          type="button"
          onClick={() => handleAttendanceChange(false)}
          className={`min-w-[150px] p-2 text-white rounded transition duration-200 ${attendanceState === false ? 'bg-red-500 disabled' : 'bg-red-300 hover:bg-red-700'}`}
        >
          Deltager ikke
        </button>
      </div>
    </div>
  );
};

export default AddEmployeeFramerStepThree;