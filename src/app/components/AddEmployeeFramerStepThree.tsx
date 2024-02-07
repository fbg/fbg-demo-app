// components/AddEmployeeFramerStepThree.tsx

import { useFormContext } from 'react-hook-form';
import {Switch} from "@radix-ui/themes";

const AddEmployeeFramerStepThree: React.FC = () => {
  const { setValue, watch } = useFormContext();
  const attendanceState = watch('attendanceState');
  const name = watch('name');
  const position = watch('position');

  const handleToggleAttendance = (checked: boolean) => {
    setValue('attendanceState', checked);
  };

  return (
    <div className="flex flex-col p-4">
      <p className="text-3xl font-bold mb-[25px] text-center">Check info og sæt status for deltagelse</p>
      <div className={`transition-all duration-200 flex items-center justify-between p-[15px] flex-grow text-black md:rounded ${ attendanceState ? 'bg-green-100' : 'bg-red-100' }`}>
        <div className="flex flex-grow">
          <div className="flex my-auto px-[10px]">
            {name} - {position}
          </div>
        </div>
        <div className="flex items-center">
          <Switch
              checked={attendanceState}
              onCheckedChange={handleToggleAttendance}
              color="green"
              className="switch"
              size="3"
          />

        </div>
      </div>
    </div>
  );
};


export default AddEmployeeFramerStepThree;