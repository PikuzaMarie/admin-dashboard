import { NavLink } from 'react-router-dom';

import { SIDEBAR_ITEMS } from '../../constants';

export const RouteSelect: React.FC = () => {
  return (
    <div className="space-y-1">
      {SIDEBAR_ITEMS.map(item => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            `flex w-full items-center justify-start gap-2 rounded px-2 py-1.5 text-sm transition-[box-shadow,_background-color,_color] ${
              isActive
                ? 'bg-white text-stone-950 shadow'
                : 'bg-transparent text-stone-500 shadow-none hover:bg-stone-200'
            }`
          }
        >
          <item.Icon /> {item.name}
        </NavLink>
      ))}
    </div>
  );
};
