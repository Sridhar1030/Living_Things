import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

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
            aria-current={isActive ? 'page' : undefined}
        >
            {children}
        </Link>
    );
};

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear localStorage
        localStorage.clear();

        // Redirect to the homepage ("/")
        navigate('/');
    };

    return (
        <header className="bg-blue-950 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-3xl font-bold text-white">
                        Energy Analytics
                    </h1>
                    <nav className="flex space-x-4">
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <NavLink to="/logtable">Access Logs</NavLink>
                        <NavLink to="/log-form">Log Form</NavLink>
                    </nav>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
