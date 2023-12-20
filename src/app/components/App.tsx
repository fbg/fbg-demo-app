import React from 'react';
import EmployeeList from './employeeList';
import employeeData from './employeeData';

const App = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Medarbejdere</h1>
      <EmployeeList employees={employeeData} />
    </div>
  );
};

App.displayName = "App";

export default App;