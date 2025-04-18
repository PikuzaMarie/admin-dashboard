import { motion } from 'framer-motion';

import { Dashboard } from '../../components/Dashboard';
import { CategoryDistributionChart } from '../../components/Dashboard/CategoryDistributionChart';
import { SalesChannelChart } from '../../components/Dashboard/SalesChannelChart';
import { SalesOverviewChart } from '../../components/Dashboard/SalesOverviewChart';
import { StatCard } from '../../components/Dashboard/StatCard';
import { STAT_CARDS_DATA } from '../../constants';

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
