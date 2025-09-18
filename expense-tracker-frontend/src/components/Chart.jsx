import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Chart({ expenses }) {
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Spending by Category',
        data: Object.values(categoryTotals),
        backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#6c757d','pink'],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  return (
    <div className="card m-3 p-3 shadow-sm">
      <h4 className="text-info">Spending Chart</h4>
      <Bar data={data} options={options} />
    </div>
  );
}

export default Chart;