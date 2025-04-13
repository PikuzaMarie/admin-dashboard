import { motion } from 'framer-motion';

import { Dashboard } from '../../components/Dashboard';
import { StatCard } from '../../components/Dashboard/StatCard';
import { STAT_CARDS } from '../../constants';

export const HomePage: React.FC = () => {
  return (
    <Dashboard title="Home">
      <motion.div
        className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {STAT_CARDS.map(card => (
          <StatCard key={card.name} {...card} />
        ))}
      </motion.div>
    </Dashboard>
  );
};
