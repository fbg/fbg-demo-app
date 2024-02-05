import EmployeeList from './employeeList';
import BTNgrouping from './BTNgrouping';
import AddEmployeeFramerMotion from './AddEmployeeFramerMotion';
// import AddEmployeeDialog from './AddEmployeeDialog';

const App: React.FC = () => {
    return (
        <>
            <div className="flex flex-1 flex-col items-center justify-center max-w-full overflow-x-auto pb-[20px] md:pb-0">
                <h1 className="text-4xl font-bold my-[20px] md:mt-0 md:mb-[40px]">Deltagere</h1>
                <EmployeeList/>
                <div className="flex gap-[20px] mt-[20px]"> {/* Add a flex container for buttons */}
                    <BTNgrouping/>
                    <AddEmployeeFramerMotion/>
                    {/* <AddEmployeeDialog/> */}
                </div>
            </div>
        </>
    );
};

App.displayName = "App";

export default App;
