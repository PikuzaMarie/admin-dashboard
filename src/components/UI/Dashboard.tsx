import { StoreLogo } from '../StoreLogo';

interface DashboardProps {
  title: string;
  children: React.ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({ title, children }) => {
  return (
    <div className="h-auto w-full rounded-lg bg-white pb-4 shadow">
      <header className="mt-2 mb-4 flex justify-between border-b border-stone-200 px-4 pb-7">
        <h1 className="block text-lg font-bold">{title}</h1>
        <StoreLogo />
      </header>
      <main className="flex flex-col gap-4 px-4">{children}</main>
    </div>
  );
};
