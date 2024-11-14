import React from 'react';
import ChartComponent from './Components/ChartComponent';
import LogForm from './Components/LogForm';

const App = () => {
  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <ChartComponent />
      <LogForm />
    </div>
  );
};

export default App;
