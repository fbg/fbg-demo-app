import React, {useEffect, useState} from 'react';
import EmployeeList from './employeeList';

const App: React.FC = () => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <h1 className="text-4xl font-bold">Medarbejdere</h1>
            <EmployeeList/>
        </div>
    );
};

App.displayName = "App";

export default App;
