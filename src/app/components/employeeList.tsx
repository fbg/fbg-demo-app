import React, { useState } from 'react';

// Define the prop types for the EmployeeList component
interface EmployeeListProps {
    employees: Array<{
    id: number;
    name: string;
    position: string;
    }>;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
const [attendance, setAttendance] = useState<{ [key: number]: boolean }>({});

const toggleAttendance = (id: number) => {
setAttendance((prevAttendance) => ({
...prevAttendance,
[id]: !prevAttendance[id],
}));
};

return (
<div className="flex justify-center items-center h-screen">
    <ul className="flex flex-col bg-light-blue-200 border-2 border-black rounded-lg p-12 m-12 max-w-[your-width]">
    {employees.map((employee) => (
        <li className="flex" key={employee.id}>
        {employee.name} - {employee.position}
        <button
            className={`ml-4 p-2 flex self-end ${
            attendance[employee.id] ? 'bg-green-500' : 'bg-red-500'
            } text-white rounded`}
            onClick={() => toggleAttendance(employee.id)}
        >
            {attendance[employee.id] ? 'Attending' : 'Not Attending'}
        </button>
        </li>
    ))}
    </ul>
</div>
);
};

export default EmployeeList;
