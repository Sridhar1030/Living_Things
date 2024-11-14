import React, { useState } from 'react';
import axios from 'axios';

const LogForm = () => {
    const [accessTime, setAccessTime] = useState('');
    const [accessDate, setAccessDate] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [algoStatus, setAlgoStatus] = useState('Energy Saving Mode OFF');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const logData = { accessTime, accessDate, employeeName, algoStatus };

        axios.post('http://localhost:3000/api/logs', logData)
            .then(response => {
                setLoading(false);
                alert('Log saved successfully');
            })
            .catch(err => {
                setLoading(false);
                console.error(err);
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
                        value={accessTime}
                        onChange={e => setAccessTime(e.target.value)}
                        className="bg-white text-blue-900 p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Access Date</label>
                    <input
                        type="date"
                        value={accessDate}
                        onChange={e => setAccessDate(e.target.value)}
                        className="bg-white text-blue-900 p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Employee Name</label>
                    <input
                        type="text"
                        value={employeeName}
                        onChange={e => setEmployeeName(e.target.value)}
                        className="bg-white text-blue-900 p-2 rounded-md w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Energy Saving Mode</label>
                    <select
                        value={algoStatus}
                        onChange={e => setAlgoStatus(e.target.value)}
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