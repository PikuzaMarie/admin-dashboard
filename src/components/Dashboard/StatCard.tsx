import { motion } from 'framer-motion';
import React from 'react';
import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';

import { StatCardType } from '../../types';
import { formatCurrency } from '../../utils';

export const StatCard: React.FC<StatCardType> = ({
  title,
  value,
  trend,
  pillText,
  period,
}) => {
  return (
    <motion.div
      className="overflow-hidden rounded-xl bg-transparent"
      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.20)' }}
    >
      <div className="col-span-4 rounded-xl border border-stone-300 p-4">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h3 className="mb-2 text-sm text-stone-500">{title}</h3>
            <p className="text-3xl font-semibold">{formatCurrency(value)}</p>
          </div>

          <span
            className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium ${
              trend === 'up'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
          </span>
        </div>

        <p className="text-xs text-stone-500">{period}</p>
      </div>
    </motion.div>
  );
};
