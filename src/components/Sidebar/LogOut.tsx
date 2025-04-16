import { FiLogOut } from 'react-icons/fi';

import { userLoggedOut } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../hooks';

export const LogOut: React.FC = () => {
  const dispatch = useAppDispatch();
  function handleLogout() {
    dispatch(userLoggedOut());
  }
  return (
    <div className="sticky top-[calc(100vh_-_48px_-_16px)] flex h-12 flex-col justify-end border-t border-stone-300 px-2 text-xs">
      <button
        className="flex cursor-pointer items-center gap-2 rounded bg-transparent p-2 text-sm text-stone-950 transition-colors hover:bg-stone-300"
        onClick={handleLogout}
      >
        <FiLogOut />
        Log Out
      </button>
    </div>
  );
};
