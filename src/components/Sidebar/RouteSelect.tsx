import { IconType } from 'react-icons';
import {
  FiDollarSign,
  FiHome,
  FiLink,
  FiPaperclip,
  FiUsers,
} from 'react-icons/fi';

export const RouteSelect: React.FC = () => {
  return (
    <div className="space-y-1">
      <Route Icon={FiHome} selected={true} title="Dashboard" />
      <Route Icon={FiUsers} selected={false} title="Team" />
      <Route Icon={FiPaperclip} selected={false} title="Invoices" />
      <Route Icon={FiLink} selected={false} title="Integrations" />
      <Route Icon={FiDollarSign} selected={false} title="Finance" />
    </div>
  );
};

interface RouteProps {
  selected: boolean;
  Icon: IconType;
  title: string;
}

const Route: React.FC<RouteProps> = ({ selected, Icon, title }) => {
  return (
    <button
      className={`flex w-full items-center justify-start gap-2 rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
        selected
          ? 'bg-white text-stone-950 shadow'
          : 'bg-transparent text-stone-500 shadow-none hover:bg-stone-200'
      }`}
    >
      <Icon className={`${selected ? 'text-violet-500' : ''}`} />
      {title}
    </button>
  );
};
