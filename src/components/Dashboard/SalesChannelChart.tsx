import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { COLORS, SALES_CHANNEL_DATA } from '../../constants';
import { ChartContainer } from './ChartContainer';

export const SalesChannelChart: React.FC = () => {
  return (
    <ChartContainer title="Sales by Channel">
      <BarChart data={SALES_CHANNEL_DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
        <XAxis dataKey="name" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'lightgrey',
            borderColor: 'lightgrey',
            borderRadius: '4px',
          }}
          itemStyle={{ color: 'black', fontWeight: 'bold' }}
        />
        <Legend />
        <Bar dataKey={'value'} fill={COLORS.blue}>
          {SALES_CHANNEL_DATA.map((item, index) => (
            <Cell key={`cell-${index}`} fill={item.color} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
