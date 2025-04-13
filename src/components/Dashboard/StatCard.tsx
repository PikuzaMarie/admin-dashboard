import { motion } from 'framer-motion';
import React from 'react';

import { StatCardType } from '../../types';

export const StatCard: React.FC<StatCardType> = ({
  name,
  Icon,
  color,
  value,
}) => {
  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-stone-200 bg-transparent shadow-sm backdrop-blur-sm"
      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
    >
      <div className="px-4 py-5 sm:p-6">
        <span className="flex items-center text-sm font-medium text-stone-800">
          <Icon size={20} className="mr-2" style={{ color }} />
          {name}
        </span>
        <p className="mt-1 text-3xl font-semibold">{value}</p>
      </div>
    </motion.div>
  );
};
