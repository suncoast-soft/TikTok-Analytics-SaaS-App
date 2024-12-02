'use client'

import { Line } from 'react-chartjs-2'

const LineChart = ({ data }: { data: any }) => {
  const chartData = {
    labels: ['2024-10-01', '2024-11-01'], // Example dates
    datasets: [
      {
        label: 'GMV',
        data: [0, 0], // Use actual data here
        borderColor: '#f00',
        backgroundColor: 'rgba(255, 0, 0, 0.2)'
      },
      {
        label: 'Units Sold',
        data: [0, 0], // Use actual data here
        borderColor: '#00f',
        backgroundColor: 'rgba(0, 0, 255, 0.2)'
      }
    ]
  }

  return <Line data={chartData} />
}

export default LineChart
