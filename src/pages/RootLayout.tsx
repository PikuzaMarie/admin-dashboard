import { Sidebar } from '../components/Sidebar';

export const RootLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="grid grid-cols-[220px_1fr] gap-4 bg-stone-100 p-4 text-stone-950">
      <Sidebar />
      {children}
    </div>
  );
};
