import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import ChartComponent from './Components/ChartComponent';
import LogForm from './Components/LogForm';
import FilteredDataPage from './Components/FilteredData';
import LogTable from './Components/LogTable';

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-all duration-200 
                ${isActive
          ? 'bg-orange-500 text-white'
          : 'text-gray-300 hover:bg-blue-800 hover:text-white'
        }`}
    >
      {children}
    </Link>
  );
};

const App = () => {
  const [showLogForm, setShowLogForm] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-500">
        {/* Navigation Header */}
        <header className="bg-blue-950 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-3xl font-bold text-white">
                Energy Analytics
              </h1>
              <nav className="flex space-x-4">
                <NavLink to="/">
                  Dashboard
                </NavLink>
                <NavLink to="/logtable">
                  Access Logs
                </NavLink>
                <NavLink to="/log-form">
                  Log Form
                </NavLink>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gray-500 rounded-xl p-6">
            <Routes>
              {/* Dashboard Route */}
              <Route
                path="/"
                element={
                  <div className="space-y-6">
                      <h2 className="text-2xl font-semibold text-white mb-4">
                        Energy Consumption Overview
                      </h2>
                      <ChartComponent />

                  </div>
                }
              />

              {/* Other Routes */}
              <Route
                path="/log-form"
                element={
                  <div className="bg-blue-300 rounded-lg p-6 shadow-lg">
                    <LogForm />
                  </div>
                }
              />
              <Route
                path="/log-form "
                element={
                  <div className="bg-blue-200 rounded-lg p-6 shadow-lg">
                    <LogForm/>
                  </div>
                }
              />
              <Route
                path="/filtered-data"
                element={
                  <div className="bg-blue-200 rounded-lg p-6 shadow-lg">
                    <FilteredDataPage />
                  </div>
                }
              />
              <Route
                path="/logtable"
                element={
                    <LogTable />
                }
              />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;