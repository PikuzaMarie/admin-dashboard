import { motion } from 'framer-motion';

import { STAT_CARDS_DATA } from '../constants';
import { CategoryDistributionChart } from './charts/CategoryDistributionChart';
import { SalesChannelChart } from './charts/SalesChannelChart';
import { SalesOverviewChart } from './charts/SalesOverviewChart';
import { StatCard } from './charts/StatCard';
import { Dashboard } from './UI/Dashboard';

export const HomePage: React.FC = () => {
  return (
    <Dashboard title="Home">
      <motion.div
        className="grid gap-5 md:grid-cols-1 lg:grid-cols-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {STAT_CARDS_DATA.map(card => (
          <StatCard key={card.title} {...card} />
        ))}
      </motion.div>
      <div className="grid-col-2 grid gap-8 lg:grid-cols-2">
        <SalesOverviewChart />
        <CategoryDistributionChart />
      </div>

      <SalesChannelChart />
    </Dashboard>
  );
};
