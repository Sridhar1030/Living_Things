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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Access Time: </label>
                <input type="time" value={accessTime} onChange={e => setAccessTime(e.target.value)} required />
            </div>
            <div>
                <label>Access Date: </label>
                <input type="date" value={accessDate} onChange={e => setAccessDate(e.target.value)} required />
            </div>
            <div>
                <label>Employee Name: </label>
                <input type="text" value={employeeName} onChange={e => setEmployeeName(e.target.value)} required />
            </div>
            <div>
                <label>Energy Saving Mode: </label>
                <select value={algoStatus} onChange={e => setAlgoStatus(e.target.value)}>
                    <option>Energy Saving Mode ON</option>
                    <option>Energy Saving Mode OFF</option>
                </select>
            </div>
            <button type="submit" disabled={loading}>Submit</button>
        </form>
    );
};

export default LogForm;
