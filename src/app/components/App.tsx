import EmployeeList from './employeeList';
import BTNgrouping from './BTNgrouping';
import AddEmployeeFramerMotion from './AddEmployeeFramerMotion';
// import AddEmployeeDialog from './AddEmployeeDialog';

const App: React.FC = () => {
    return (
        <>
            <div className="flex flex-1 flex-col items-center justify-center max-w-full overflow-x-auto">
                <h1 className="text-4xl font-bold">Deltagere</h1>
                <EmployeeList/>
                <div className="flex gap-4"> {/* Add a flex container for buttons */}
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
