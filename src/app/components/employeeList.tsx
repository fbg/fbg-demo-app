// components/employeeList.tsx

import React, { 
    useEffect, 
    useMemo, 
    useCallback 
} from 'react';

import useStore from '@/store/store';
import DeleteEmployeeDialog from '@/app/components/DeleteEmployeeDialog';
import {Switch} from "@radix-ui/themes";

const EmployeeList: React.FC = () => {
    const {
        employees,
        fetchEmployeeData,
        toggleAttendance,
        removeEmployee,
        isGrouped
    } = useStore(state => ({
        employees: state.employees,
        fetchEmployeeData: state.fetchEmployeeData,
        toggleAttendance: state.toggleAttendance,
        removeEmployee: state.removeEmployee,
        isGrouped: state.isGrouped
    }));

    useEffect(() => {
        fetchEmployeeData();
    }, [fetchEmployeeData]);
    
    const sortedEmployees = useMemo(() => {
        const arrayFromEmployees = Array.from(employees.values());
    
        const compareAttendanceState = (a: { attendanceState: boolean, name: string; }, b: { attendanceState: boolean, name: string; }) => {
            if (a.attendanceState > b.attendanceState) return -1;
            if (a.attendanceState < b.attendanceState) return 1;
            return compareNames(a, b);
        };
    
        const compareNames = (a: { name: { toLowerCase: () => string; }; }, b: { name: { toLowerCase: () => string; }; }) => {
            return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        };
    
        return isGrouped
            ? arrayFromEmployees.sort(compareAttendanceState)
            : arrayFromEmployees.sort(compareNames);
    }, [employees, isGrouped]);
    
    const handleToggleAttendance = useCallback((GUID: string) => {
        toggleAttendance(GUID);
    }, [toggleAttendance]);

    const handleRemoveEmployee = useCallback((GUID: string) => {
        removeEmployee(GUID);
    }, [removeEmployee]);

    return (
        <div className="flex justify-center items-center">
            <ul className="flex flex-col bg-white border-0 md:border-2 border-black md:rounded-lg p-0 md:p-[50px] m-0 content-between gap-[8px] md:gap-[20px]">
            {
            sortedEmployees.map((employee, index) => (
                <li 
                    key={employee.GUID} 
                    className="flex items-center justify-between"
                >
                    <div className={`transition-all duration-200 flex items-center justify-between p-[15px] flex-grow text-black md:rounded ${ employee.attendanceState ? 'bg-green-100' : 'bg-red-100' }`} >
                        <div className="flex flex-grow">
                            <div className="flex my-auto px-[10px]">
                                {employee.name} - {employee.position}
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Switch
                                checked={employee.attendanceState}
                                onCheckedChange={() => handleToggleAttendance(employee.GUID)}
                                color="green"
                                className="switch"
                                size="3"
                                id={`switch-${employee.GUID}`}
                            />
                            <DeleteEmployeeDialog
                                employeeGUID={employee.GUID}
                                employeeName={employee.name}
                                onConfirm={() => handleRemoveEmployee(employee.GUID)}
                            />
                        </div>
                    </div>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
