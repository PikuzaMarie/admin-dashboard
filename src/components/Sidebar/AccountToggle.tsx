import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface AccountToggleProps {
  name: string;
  email: string;
  handleChevronDownCLick?: () => void;
  handleChevronUpClick?: () => void;
}

export const AccountToggle: React.FC<AccountToggleProps> = ({
  name,
  email,
  handleChevronDownCLick,
  handleChevronUpClick,
}) => {
  return (
    <div className="mt-2 mb-4 border-b border-stone-300 pb-4">
      <div className="relative flex w-full items-center gap-2 rounded p-0.5 transition-colors hover:bg-stone-200">
        <img
          src="https://api.dicebear.com/9.x/notionists/svg"
          alt="avatar"
          className="size-8 shrink-0 rounded bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="block text-sm font-semibold">{name}</span>
          <span className="block text-xs text-stone-500">
            {email.length > 23 ? email.substring(0, 23).concat('...') : email}
          </span>
        </div>
        {handleChevronUpClick && handleChevronDownCLick && (
          <>
            <FiChevronDown
              size={18}
              className="absolute top-1/2 right-2 translate-y-[calc(-50%+8px)] rounded-md text-xs hover:bg-stone-400"
              onClick={handleChevronDownCLick}
            />
            <FiChevronUp
              size={18}
              className="absolute top-1/2 right-2 translate-y-[calc(-50%-8px)] rounded-md text-xs hover:bg-stone-400"
              onClick={handleChevronUpClick}
            />
          </>
        )}
      </div>
    </div>
  );
};
