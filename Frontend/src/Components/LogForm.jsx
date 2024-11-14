import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirect

const LogForm = () => {
    const [access_time, setaccess_time] = useState('');
    const [access_date, setaccess_date] = useState('');
    const [employee_name, setemployee_name] = useState('');
    const [algo_status, setalgo_status] = useState('Energy Saving Mode OFF');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // Hook for redirecting after form submission

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = { access_time, access_date, employee_name, algo_status };

        // Send form data to backend to save the log (only access_time and access_date are saved)
        axios.post('http://localhost:3000/api/logs', formData)
            .then((response) => {
                setLoading(false);
                alert('Log saved successfully');

                // After saving the log, redirect to the filtered data page
                navigate(`/filtered-data?date=${access_date}&algo_status=${algo_status === 'Energy Saving Mode ON' ? 1 : 0}`);
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
                alert('Error saving log');
            });
    };

    return (
        <div className="bg-blue-900 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Employee Access Log</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Access Time</label>
                    <input
                        type="time"
                        value={access_time}
                        onChange={(e) => setaccess_time(e.target.value)}
                        className="bg-white text-blue-900 p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Access Date</label>
                    <input
                        type="date"
                        value={access_date}
                        onChange={(e) => setaccess_date(e.target.value)}
                        className="bg-white text-blue-900 p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Employee Name</label>
                    <input
                        type="text"
                        value={employee_name}
                        onChange={(e) => setemployee_name(e.target.value)}
                        className="bg-white text-blue-900 p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Energy Saving Mode</label>
                    <select
                        value={algo_status}
                        onChange={(e) => setalgo_status(e.target.value)}
                        className="bg-white text-blue-900 p-2 rounded-md w-full"
                    >
                        <option>Energy Saving Mode ON</option>
                        <option>Energy Saving Mode OFF</option>
                    </select>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md"
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default LogForm;
