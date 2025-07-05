
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for sales chart
const data = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 7890 },
  { month: 'Jun', sales: 3200 },
  { month: 'Jul', sales: 3500 },
  { month: 'Aug', sales: 4300 },
  { month: 'Sep', sales: 4800 },
  { month: 'Oct', sales: 5990 },
  { month: 'Nov', sales: 4800 },
  { month: 'Dec', sales: 6900 },
];

const SalesChart = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="month" tickLine={false} />
          <YAxis 
            tickFormatter={(value) => `$${value}`}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, 'Sales']}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.375rem',
              padding: '0.5rem',
            }}
          />
          <Bar dataKey="sales" fill="#e97451" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
