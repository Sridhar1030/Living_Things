import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';  // To read query parameters

const FilteredDataPage = () => {
    const [chartData, setChartData] = useState(null);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const accessDate = queryParams.get('date');
    const algoStatus = queryParams.get('algo_status');

    useEffect(() => {
        // Fetch filtered chart data based on query parameters
        axios.get('http://localhost:3000/api/charts', {
            params: {
                date: accessDate,
                algo_status: algoStatus,
            }
        })
            .then((response) => {
                const data = response.data;

                setChartData({
                    labels: data.map(item => new Date(item.createdAt).toLocaleDateString()),
                    datasets: [{
                        label: 'Energy Consumption (kWh)',
                        data: data.map(item => item.total_kwh),
                        borderColor: '#FFA500',
                        backgroundColor: '#FFA500',
                        fill: false,
                    }],
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [accessDate, algoStatus]);

    return (
        <div className="bg-blue-900 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Filtered Chart Data</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {chartData && (
                    <Line
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
