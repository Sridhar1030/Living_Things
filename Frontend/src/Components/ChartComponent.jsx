import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement);

const ChartComponent = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const chartRef = React.useRef(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/charts')
            .then(response => {
                const data = response.data;

                // Group data by date and sum the total_kwh
                const groupedData = data.reduce((acc, curr) => {
                    const dateStr = new Date(curr.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    });

                    if (!acc[dateStr]) {
                        acc[dateStr] = {
                            total_kwh: 0,
                            algo_status: curr.algo_status,
                        };
                    }
                    acc[dateStr].total_kwh += curr.total_kwh;
                    return acc;
                }, {});

                // Sort the grouped data by date
                const sortedData = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));

                // Set the chart data
                setChartData({
                    labels: sortedData,
                    datasets: [
                        {
                            label: 'Energy Consumption (kWh)',
                            data: sortedData.map(date => groupedData[date].total_kwh),
                            backgroundColor: sortedData.map(date => groupedData[date].algo_status === "0" ? '#00e4ff' : '#419f98'),
                        },
                    ],
                });
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-blue-900 rounded-lg">
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-orange-500 rounded-full animate-pulse"></div>
                    <div className="w-12 h-12 border-4 border-transparent border-t-blue-400 rounded-full animate-spin absolute top-0"></div>
                </div>
                <p className="mt-4 text-white text-lg font-medium">Loading Chart Data...</p>
            </div>
        );
    }

    return (
        <div className="bg-blue-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Energy Consumption by Date</h2>
            <div className="bg-white p-4 rounded-lg">
                <Bar
                    ref={chartRef}
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: 'Energy Consumption by Date',
                            },
                        },
                        legend: {
                            display: false,
                        },
                        scales: {
                            x: {
                                type: 'category',
                                title: {
                                    display: true,
                                    text: 'Date',
                                },
                                ticks: {
                                    autoSkip: true,
                                    maxRotation: 45,
                                    minRotation: 30,
                                },
                            },
                            y: {
                                type: 'linear',
                                title: {
                                    display: true,
                                    text: 'Energy Consumption (kWh)',
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