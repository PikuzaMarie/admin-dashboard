import React from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { COLORS, SALES_DATA } from '../../constants';
import { ChartContainer } from './ChartContainer';

export const SalesOverviewChart: React.FC = () => {
  return (
    <ChartContainer title="Sales Overview">
      <LineChart data={SALES_DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
        <XAxis dataKey={'name'} stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'lightgrey',
            borderColor: 'lightgrey',
            borderRadius: '4px',
          }}
          itemStyle={{ color: 'black', fontWeight: 'bold' }}
        />
        <Line
          type="monotone"
          dataKey="sales"
          stroke={COLORS.violet}
          strokeWidth={3}
          dot={{ fill: COLORS.violet, strokeWidth: 2, r: 6 }}
          activeDot={{ r: 8, strokeWidth: 2 }}
        />
      </LineChart>
    </ChartContainer>
  );
};
