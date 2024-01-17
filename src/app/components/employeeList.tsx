import useStore from '@/store/store';

// Define the prop types for the EmployeeList component

const EmployeeList: React.FC = () => {
    const {employees,attendance,toggleAttendance,isGrouped} = useStore();

    const sortedEmployees = (isGrouped 
        ? employees
            .sort((a, b) => (a.attendanceState > b.attendanceState ? -1 : (a.attendanceState < b.attendanceState ? 1 : (a.name < b.name ? -1 : 1))))
        : employees
            .sort((a, b) => (a.name < b.name ? -1 : 1))
    );

    const totalCount = employees.length;
    const ulPaddingBottomValue = (totalCount - 1) * 20 + 50;

    return (
    <div className="flex justify-center items-center">
        <ul className="flex flex-col bg-white border-2 border-black rounded-lg pt-[50px] pl-[50px] pr-[50px] m-12 content-between gap-4" 
            style={{paddingBottom: `${ulPaddingBottomValue}px`}}>
        {
        sortedEmployees.map((employee, index) => (
            <li key={employee.id} 
                className={`transition-all duration-200 flex items-center p-[15px] ${ employee.attendanceState ? 'bg-green-100' : 'bg-red-100' } text-black rounded`} 
                style={{ transform: `translateY(${index * 20}px)` }}>
                <div className="flex-shrink-0">
                    <div className="flex my-auto px-[10px]">
                        {employee.name} - {employee.position}
                    </div>
                </div>
                <button className={`ml-4 p-2 ml-auto text-white ${ employee.attendanceState ? 'bg-green-500' : 'bg-red-500' } text-white rounded`} 
                        onClick={() => toggleAttendance(employee.id)}>
                    <div className="min-w-[150px] text-center">
                        {employee.attendanceState ? 'Attending' : 'Not Attending'}
                    </div>
                </button>
            </li>
        ))}
        </ul>
    </div>
    );
};

export default EmployeeList;
