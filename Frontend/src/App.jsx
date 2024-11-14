import React, { useState } from 'react';
import ChartComponent from './Components/ChartComponent';
import LogForm from './Components/LogForm';

const App = () => {
  const [showLogForm, setShowLogForm] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
      <ChartComponent />
      <button
        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md mt-6"
        onClick={() => setShowLogForm(true)}
      >
        Show Log Form
      </button>
      {showLogForm && <LogForm />}
    </div>
  );
};

export default App;