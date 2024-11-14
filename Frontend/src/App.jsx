// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChartComponent from './Components/ChartComponent';
import LogForm from './Components/LogForm';
import FilteredDataPage from './Components/FilteredData';
import LogTable from './Components/LogTable';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';
import Navbar from './Components/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/SignUp';

const App = () => {
  const [showLogForm, setShowLogForm] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900">
        <Routes>
          <Route path="/" element={<PublicRoute element={<Login />} />} />
          <Route path="/signup" element={<PublicRoute element={<Signup />} />} />

        </Routes>

        {/* Main Application Layout */}
        <div className="min-h-screen">
          {/* Navigation Header */}
          <Navbar />

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="rounded-xl p-6">
              <Routes>
                {/* Dashboard Route */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute
                      element={
                        <div className="space-y-6">
                          <h2 className="text-2xl font-semibold text-white mb-4">
                            Energy Consumption Overview
                          </h2>
                          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                            <ChartComponent />
                          </div>
                        </div>
                      }
                    />
                  }
                />

                {/* Other Routes */}
                <Route
                  path="/log-form"
                  element={
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
                      <LogForm />
                    </div>
                  }
                />
                <Route
                  path="/filtered-data"
                  element={
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
                      <FilteredDataPage />
                    </div>
                  }
                />
                <Route
                  path="/logtable"
                  element={
                    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg">
                      <LogTable />
                    </div>
                  }
                />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;