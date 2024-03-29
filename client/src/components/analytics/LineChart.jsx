import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const state = {
	labels: ["January", "February", "March", "April", "May"],
	datasets: [
		{
			label: "Rainfall",
			backgroundColor: "rgba(75,192,192,1)",
			borderColor: "rgba(0,0,0,1)",
			borderWidth: 2,
			data: [65, 59, 80, 81, 56],
		},
	],
};
const LineChart = ({ chartData }) => {
	return <Line data={chartData} />;
};

export default LineChart;
