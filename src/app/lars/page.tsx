"use client";
import React, {useEffect, useState} from 'react';

import Link from "next/link";
import App, {AttendanceState, Employee} from '../components/App';
import employeeData from "@/app/components/employeeData";

const Lars: React.FC = () => {

    const [employees, setEmployees] = useState<Employee[]>(employeeData);

    useEffect(() => {
        setEmployees(employeeData);
    }, []);

    const useStateDefault: AttendanceState = {};
    employees.map((employee) => {
        useStateDefault[employee.id] = employee.attendanceState;
    });

    const [attendance, setAttendance] = useState<AttendanceState>(useStateDefault);

    const toggleAttendance = (id: number) => {
        setAttendance((prevAttendance) => ({
            ...prevAttendance,
            [id]: !prevAttendance[id],
        }));
    };

    const [isVisible, setIsVisible] = useState(true);

    return (
        <div className="flex w-full flex-col flex-1 min-h-screen bg-slate-200">
            <div className="grid grid-cols-2">
                <div className="p-5">
                    <Link className="border-gray-500 border p-2" href='/'>Tilbage</Link>
                </div>
                <div className="p-5 text-right">Lars playground</div>
            </div>

            <button onClick={() => {
                setIsVisible(!isVisible);
            }}>Toggle
            </button>

            {isVisible ? <div className="flex w-full flex-1 flex-col items-center">
                <div className="flex flex-1 w-full flex-col bg-slate-400 items-center">
                    {<App toggleAttendance={toggleAttendance} employees={employees} attendance={attendance}/>}
                </div>
            </div> : <div>Not visible</div>}
        </div>
    )
}

export default Lars;

Lars.displayName = "Lars";
