import { motion } from 'framer-motion';
import React from 'react';

import { DailySalesTrend } from '../components/charts/DialySalesChart';
import { SalesChannelChart } from '../components/charts/SalesChannelChart';
import { StatCard } from '../components/charts/StatCard';
import { Dashboard } from '../components/UI/Dashboard';
import { SALES_STATS } from '../constants';

export const SalesPage: React.FC = () => {
  return (
    <Dashboard title="Sales">
      <motion.div
        className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <StatCard
          title="Total Revenue"
          value={SALES_STATS.totalRevenue}
          trend="up"
          pillText="30.10%"
          period="Previous month"
        />
        <StatCard
          title="Total Revenue"
          value={SALES_STATS.totalProfit}
          trend="up"
          pillText="10.05%"
          period="Previous month"
        />
        <StatCard
          title="Total Revenue"
          value={SALES_STATS.averageOrderPrice}
          trend="up"
          pillText="18.3%"
          period="Previous month"
        />
      </motion.div>
      <DailySalesTrend />
      <SalesChannelChart />
    </Dashboard>
  );
};
