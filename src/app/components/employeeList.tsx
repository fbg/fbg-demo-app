import React, { useState } from 'react';
import {AttendanceState, Employee} from "@/app/components/App";

// Define the prop types for the EmployeeList component
interface Props {
    employees: Employee[];
    attendance: AttendanceState;
    toggleAttendance: (id: number) => void;
}

const EmployeeList: React.FC<Props> = ({ employees, attendance, toggleAttendance }) => {
    const totalCount = employees.length;
    const ulPaddingBottomValue = (totalCount - 1) * 20 + 50;
    return (
    <div className="flex justify-center items-center">
        <ul className="flex flex-col bg-white border-2 border-black rounded-lg pt-[50px] pl-[50px] pr-[50px] m-12 content-between gap-4" style={{paddingBottom: `${ulPaddingBottomValue}px`}}>
        {employees.sort((a, b) => (attendance[a.id] > attendance[b.id] ? -1 : (attendance[a.id] < attendance[b.id] ? 1 : (a.name < b.name ? -1 : 1)))).map((employee, index) => (
            <li key={employee.id} className={`transition-all duration-200 flex items-center p-[15px] ${ attendance[employee.id] ? 'bg-green-100' : 'bg-red-100' } text-black rounded`} style={{ transform: `translateY(${index * 20}px)` }}>
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
