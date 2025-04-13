import { Outlet } from 'react-router-dom';

import { Sidebar } from '../components/Sidebar';

export const RootLayout: React.FC = () => {
  return (
    <div className="grid grid-cols-[220px_1fr] gap-4 bg-stone-100 p-4 text-stone-950">
      <Sidebar />
      <Outlet />
    </div>
  );
};
