import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LogTable = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/api/logs')
            .then(response => {
                setLogs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching logs:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-blue-900">
                <div className="text-white text-xl">Loading logs...</div>
            </div>
        );
    }

    return (
        <div className="bg-blue-900 min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-white">Chart Access Logs</h2>
                <div className="overflow-x-auto rounded-lg shadow-xl text-black">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-orange-500 text-white">
                                <th className="py-3 px-6 text-left font-semibold">
                                    Access Time
                                </th>
                                <th className="py-3 px-6 text-left font-semibold">
                                    Access Date
                                </th>
                                <th className="py-3 px-6 text-left font-semibold">
                                    Employee Name
                                </th>
                                <th className="py-3 px-6 text-left font-semibold">
                                    Energy Saving Mode
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {logs.map((log, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-4 px-6">
                                        {log.accessTime}
                                    </td>
                                    <td className="py-4 px-6">
                                        {log.accessDate}
                                    </td>
                                    <td className="py-4 px-6">
                                        {log.employeeName}
                                    </td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium
                                                ${log.algoStatus === "0"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : "bg-green-100 text-green-800"
                                                }`}
                                        >
                                            {log.algoStatus === "0" ? "Off" : "On"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LogTable;