import { AccountToggle } from './AccountToggle';

export const Sidebar: React.FC = () => {
  return (
    <div>
      <div className="sticky top-4 h-[calc(100vh-32px-48px)] overflow-y-scroll">
        <AccountToggle />
      </div>
    </div>
  );
};
