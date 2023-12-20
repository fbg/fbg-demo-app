import React, { useState } from 'react';

// Define the prop types for the EmployeeList component
interface EmployeeListProps {
    employees: Array<{
    id: number;
    name: string;
    position: string;
    attendanceState: boolean;
    }>;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
    const useStateDefault: {[key: number]: boolean} = {};
    employees.map((employee) => {
        useStateDefault[employee.id] = employee.attendanceState;
    });

    const [attendance, setAttendance] = useState<{ [key: number]: boolean }>(useStateDefault);

    const toggleAttendance = (id: number) => {
        setAttendance((prevAttendance) => ({
            ...prevAttendance,
            [id]: !prevAttendance[id],
        }));
    };

    return (
    <div className="flex justify-center items-center">
        <ul className="flex flex-col bg-white border-2 border-black rounded-lg p-12 m-12 content-between gap-4">
        {employees.sort((a, b) => (attendance[a.id] > attendance[b.id] ? -1 : (attendance[a.id] < attendance[b.id] ? 1 : (a.name < b.name ? -1 : 1)))).map((employee) => (
            <li className={`flex items-center p-[15px] ${ attendance[employee.id] ? 'bg-green-100' : 'bg-red-100' } text-black rounded`} key={employee.id}>
                <div className="flex-shrink-0">
                    <div className="flex my-auto px-[10px]">
                        {employee.name} - {employee.position}
                    </div>
                </div>
                <button className={`ml-4 p-2 ml-auto text-white ${ attendance[employee.id] ? 'bg-green-500' : 'bg-red-500' } text-white rounded`} onClick={() => toggleAttendance(employee.id)}>
                    <div className="min-w-[150px] text-center">
                        {attendance[employee.id] ? 'Attending' : 'Not Attending'}
                    </div>
                </button>
            </li>
        ))}
        </ul>
    </div>
    );
};

export default EmployeeList;
