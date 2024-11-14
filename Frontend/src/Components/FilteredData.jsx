import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

const FilteredDataPage = () => {
    const [chartData, setChartData] = useState(null);
    const [algoStatus, setAlgoStatus] = useState(null);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const initialAlgoStatus = queryParams.get('algo_status');

    useEffect(() => {
        fetchChartData(initialAlgoStatus);
    }, [initialAlgoStatus]);

    const fetchChartData = (status) => {
        axios.get('http://localhost:3000/api/charts', {
            params: {
                algo_status: status,
            },
        })
            .then((response) => {
                const data = response.data;

                // Group and sum data by date
                const dateGroups = data.reduce((groups, item) => {
                    const date = new Date(item.createdAt).toLocaleDateString();
                    if (!groups[date]) {
                        groups[date] = {
                            total_kwh: 0,
                            algo_status: item.algo_status
                        };
                    }
                    groups[date].total_kwh += item.total_kwh;
                    return groups;
                }, {});

                // Convert grouped data to arrays for chart
                const dates = Object.keys(dateGroups);
                const values = dates.map(date => dateGroups[date].total_kwh);
                const statuses = dates.map(date => dateGroups[date].algo_status);

                setChartData({
                    labels: dates,
                    datasets: [{
                        label: 'Energy Consumption (kWh)',
                        data: values,
                        backgroundColor: statuses.map(status =>
                            status === '0' ? '#00e4ff' : '#419f98'
                        ),
                    }],
                });
                setAlgoStatus(status);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleAlgoStatusChange = () => {
        const newStatus = algoStatus === '0' ? '1' : '0';
        fetchChartData(newStatus);
    };

    return (
        <div className="bg-blue-900 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Filtered Energy Consumption Chart</h2>
            <button
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md mb-6"
                onClick={handleAlgoStatusChange}
            >
                {algoStatus === '0' ? 'Turn Energy Saving On' : 'Turn Energy Saving Off'}
            </button>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {chartData && (
                    <Bar
                        data={chartData}
                        options={{
                            plugins: {
                                title: {
                                    display: false,
                                },
                                legend: {
                                    display: true,
                                    position: 'bottom',
                                    labels: {
                                        fontColor: '#FFA500',
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    grid: {
                                        color: '#FFA500',
                                    },
                                    ticks: {
                                        fontColor: '#FFA500',
                                    },
                                },
                                y: {
                                    grid: {
                                        color: '#FFA500',
                                    },
                                    ticks: {
                                        fontColor: '#FFA500',
                                    },
                                },
                            },
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default FilteredDataPage;