import { Outlet } from 'react-router-dom';

export const RootLayout: React.FC = () => {
  return (
    <div className="bg-stone-100 text-stone-950">
      <Outlet />
    </div>
  );
};
