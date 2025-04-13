import { motion } from 'framer-motion';
import React from 'react';
import { ResponsiveContainer } from 'recharts';

interface ChartContainerProps {
  title: string;
  children: React.ReactElement;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  children,
}) => {
  return (
    <motion.div
      className="rounded-xl border border-stone-200 p-6 shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-md mb-4 font-medium text-stone-900">{title}</h2>
      <div className="h-80">
        <ResponsiveContainer width={'100%'} height={'100%'}>
          {children}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
