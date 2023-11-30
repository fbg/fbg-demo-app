import React from 'react';
import EmployeeList from './employeeList';
import employeeData from './employeeData';

const App = () => {
  return (
    <div>
      <h1>Medarbejdere</h1>
      <EmployeeList employees={employeeData} />
    </div>
  );
};

export default App;