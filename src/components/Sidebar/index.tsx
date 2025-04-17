import { AccountInfo } from './AccountInfo';
import { LogOut } from './LogOut';
import { MenuSearch } from './MenuSearch';
import { RouteSelect } from './RouteSelect';

export const Sidebar: React.FC = () => {
  return (
    <div>
      <div className="sticky top-4 h-[calc(100vh-32px-48px)] overflow-y-scroll">
        <AccountInfo />
        <MenuSearch />
        <RouteSelect />
      </div>
      <LogOut />
    </div>
  );
};
