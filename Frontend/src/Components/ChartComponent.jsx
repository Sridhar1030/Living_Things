import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement);

const ChartComponent = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const chartRef = React.useRef(null); // Using ref to track the chart instance

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
                chartRef.current.destroy(); // Properly destroy the chart when component unmounts
            }
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Energy Consumption by Date</h2>
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
                        display: false, // Hide the legend
                    },
                    scales: {
                        x: {
                            type: 'category',
                            title: {
                                display: true,
                                text: 'Date',
                            },
                            ticks: {
                                // You can adjust how the ticks appear
                                autoSkip: true,
                                maxRotation: 45, // Rotate labels if needed
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
    );
};

export default ChartComponent;
