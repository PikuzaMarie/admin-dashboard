import React from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

import { CATEGORY_DATA } from '../../constants';
import { ChartContainer } from './ChartContainer';

export const CategoryDistributionChart: React.FC = () => {
  return (
    <ChartContainer title="Category Distribution">
      <PieChart>
        <Pie
          data={CATEGORY_DATA}
          cx={'50%'}
          cy={'50%'}
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {CATEGORY_DATA.map((category, index) => (
            <Cell key={`cell-${index}`} fill={category.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            borderColor: '#4B5563',
          }}
          itemStyle={{ color: '#E5E7EB' }}
        />
        <Legend />
      </PieChart>
    </ChartContainer>
  );
};
