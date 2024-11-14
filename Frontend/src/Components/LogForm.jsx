import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogForm = () => {
    const [accessTime, setAccessTime] = useState(new Date().toLocaleTimeString());
    const [accessDate, setAccessDate] = useState(new Date().toLocaleDateString());
    const [employeeName, setEmployeeName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = { accessTime, accessDate, employeeName };

        axios.post('http://localhost:3000/api/logs', formData)
            .then((response) => {
                setLoading(false);
                alert('Log saved successfully');
                navigate(`/filtered-data?algo_status=0`);
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
                    <label className="block font-medium mb-1">Employee Name</label>
                    <input
                        type="text"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        className="bg-white text-blue-900 p-2 rounded-md w-full"
                        required
                    />
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