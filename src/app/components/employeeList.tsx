import React, { 
    useEffect, 
    useMemo, 
    useCallback 
} from 'react';

import useStore from '@/store/store';
import DeleteEmployeeDialog from '@/app/components/DeleteEmployeeDialog';

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
            <ul className="flex flex-col bg-white border-2 border-black rounded-lg p-[50px] m-12 content-between gap-4">
            {
            sortedEmployees.map((employee, index) => (
                <li key={employee.GUID} 
                className="flex items-center justify-between"
                >
                    <div
                    className={`transition-all duration-200 flex items-center p-[15px] flex-grow mr-[30px] text-black rounded ${ employee.attendanceState ? 'bg-green-100' : 'bg-red-100' }`} >
                        <div className="flex-shrink-0">
                            <div className="flex my-auto px-[10px]">
                                {employee.name} - {employee.position}
                            </div>
                        </div>
                        <button className={`ml-4 p-2 ml-auto text-white rounded transition duration-200 ${ employee.attendanceState ? 'bg-green-500 hover:bg-green-700' : 'bg-red-500 hover:bg-red-700' }`} 
                                onClick={() => handleToggleAttendance(employee.GUID)}>
                            <div className="min-w-[150px] text-center">
                                {employee.attendanceState ? 'Attending' : 'Not Attending'}
                            </div>
                        </button>
                    </div>
                    <DeleteEmployeeDialog
                        employeeGUID={employee.GUID}
                        employeeName={employee.name}
                        onConfirm={() => handleRemoveEmployee(employee.GUID)}
                    />
                </li>
            ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
