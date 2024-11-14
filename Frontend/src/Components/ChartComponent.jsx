import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/api/chart-data')
            .then(response => {
                const data = response.data;
                setChartData({
                    labels: data.map(item => new Date(item.createdAt.$date).toLocaleDateString()),
                    datasets: [{
                        label: 'Energy Consumption (kWh)',
                        data: data.map(item => item.total_kwh),
                        borderColor: '#FFA500', // Orange
                        backgroundColor: '#FFA500',
                        fill: false,
                    }],
                });
                setLoading(false);
                console.log(data.map(item => item.createdAt.$date));
            })
            .catch(err => console.error(err));
            //clg create at
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
            <h2 className="text-2xl font-bold mb-6">Energy Consumption vs Date</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
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
            </div>
        </div>
    );
};

export default ChartComponent;