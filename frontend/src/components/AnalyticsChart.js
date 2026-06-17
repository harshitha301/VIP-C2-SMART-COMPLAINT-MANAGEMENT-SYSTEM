import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function AnalyticsChart({ analytics }) {
  const data = [
  {
    name: "Electricity",
    value:
      analytics.electricityComplaints || 0,
  },
  {
    name: "Water",
    value:
      analytics.waterComplaints || 0,
  },
  {
    name: "Cleanliness",
    value:
      analytics.cleanlinessComplaints || 0,
  },
  {
    name: "Network",
    value:
      analytics.networkComplaints || 0,
  },
];

  return (
    <div className="card p-3 mb-4 shadow">
      <h4 className="mb-3">
        Analytics Overview
      </h4>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#0d6efd"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsChart;