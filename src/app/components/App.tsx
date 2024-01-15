import React, {useEffect, useState} from 'react';
import EmployeeList from './employeeList';
import employeeData from './employeeData';

export interface Employee {
    id: number;
    name: string;
    position: string;
    attendanceState: boolean;
}

interface Props {
    employees: Employee[];
    attendance: AttendanceState;
    toggleAttendance: (id: number) => void;
}

export type AttendanceState = { [key: number]: boolean };

const App: React.FC<Props> = ({employees, attendance, toggleAttendance}) => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Medarbejdere</h1>
            <EmployeeList employees={employees} attendance={attendance} toggleAttendance={toggleAttendance}/>
        </div>
    );
};

App.displayName = "App";

export default App;
