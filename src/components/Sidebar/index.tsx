import { AccountToggle } from './AccountToggle';
import { Search } from './Search';

export const Sidebar: React.FC = () => {
  return (
    <div>
      <div className="sticky top-4 h-[calc(100vh-32px-48px)] overflow-y-scroll">
        <AccountToggle />
        <Search />
      </div>
    </div>
  );
};
