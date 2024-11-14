import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ChartComponent from './Components/ChartComponent';
import LogForm from './Components/LogForm';
import FilteredDataPage from './Components/FilteredData';  // Assuming you have a page for displaying filtered data
import LogTable from './Components/LogTable';

const App = () => {
  const [showLogForm, setShowLogForm] = useState(false);

  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen p-8">
        <Link to = "/">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
        </Link>
        <Link to = "/logtable">
        <h1 className="text-3xl font-bold mb-6">Acces log Tables</h1>
        </Link>

        <Routes>
          {/* Default Route - Main Dashboard Page */}
          <Route
            path="/"
            element={
              <>
                <ChartComponent />
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md mt-6"
                  onClick={() => setShowLogForm(true)}
                >
                  Show Log Form
                </button>
                {showLogForm && <LogForm />}
              </>
            }
          />
          {/* Log Form Route */}
          <Route path="/log-form" element={<LogForm />} />
          {/* Filtered Data Route - for displaying filtered charts */}
          <Route path="/filtered-data" element={<FilteredDataPage />} />
          <Route path="/LogTable" element={<LogTable/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
