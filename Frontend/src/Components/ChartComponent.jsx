import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/api/charts')
            .then(response => {
                const data = response.data;
                setChartData({
                    labels: data.map(item => new Date(item.createdAt).toLocaleDateString()),
                    datasets: [{
                        label: 'Energy Consumption (kWh)',
                        data: data.map(item => item.total_kwh),
                        backgroundColor: '#FFA500',
                    }],
                });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-900"></div>
            </div>
        );
    }

    return (
        <div className="bg-blue-900 text-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Energy Consumption by Date</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
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
            </div>
        </div>
    );
};

export default ChartComponent;