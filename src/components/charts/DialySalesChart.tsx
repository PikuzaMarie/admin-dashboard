import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';

import { COLORS } from '../../constants';
import { ChartContainer } from './ChartContainer';

const DAILY_SALES = [
  { name: 'Mon', sales: 1000 },
  { name: 'Tue', sales: 1200 },
  { name: 'Wed', sales: 900 },
  { name: 'Thu', sales: 1100 },
  { name: 'Fri', sales: 1300 },
  { name: 'Sat', sales: 1600 },
  { name: 'Sun', sales: 1400 },
];

export const DailySalesTrend: React.FC = () => {
  return (
    <ChartContainer title="Daily sales">
      <BarChart data={DAILY_SALES}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
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
        <Bar dataKey="sales" fill={COLORS.violet} />
      </BarChart>
    </ChartContainer>
  );
};
