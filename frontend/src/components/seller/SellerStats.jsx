
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for seller stats
const data = [
  { name: 'Jan', sales: 1200 },
  { name: 'Feb', sales: 1800 },
  { name: 'Mar', sales: 1400 },
  { name: 'Apr', sales: 2200 },
  { name: 'May', sales: 1900 },
  { name: 'Jun', sales: 3200 },
  { name: 'Jul', sales: 2500 },
  { name: 'Aug', sales: 2800 },
  { name: 'Sep', sales: 3500 },
  { name: 'Oct', sales: 2700 },
  { name: 'Nov', sales: 3800 },
  { name: 'Dec', sales: 4200 },
];

const SellerStats = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey="name" tickLine={false} />
        <YAxis 
          tickFormatter={(value) => `$${value}`}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <Tooltip
          formatter={(value) => [`$${value}`, 'Sales']}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '0.375rem',
            padding: '0.5rem',
          }}
        />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#57886C"
          strokeWidth={2}
          dot={{ r: 4, fill: '#57886C' }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SellerStats;
