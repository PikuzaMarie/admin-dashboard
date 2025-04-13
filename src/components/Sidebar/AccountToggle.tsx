import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export const AccountToggle: React.FC = () => {
  return (
    <div className="mt-2 mb-4 border-b border-stone-300 pb-4">
      <button className="relative flex w-full items-center gap-2 rounded p-0.5 transition-colors hover:bg-stone-200">
        <img
          src="https://api.dicebear.com/9.x/notionists/svg"
          alt="avatar"
          className="size-8 shrink-0 rounded bg-violet-500 shadow"
        />
        <div className="text-start">
          <span className="block text-sm font-semibold">Marie</span>
          <span className="block text-xs text-stone-500">marie@front.dev</span>
        </div>
        <FiChevronDown className="absolute top-1/2 right-2 translate-y-[calc(-50%+4px)] text-xs" />
        <FiChevronUp className="absolute top-1/2 right-2 translate-y-[calc(-50%-4px)] text-xs" />
      </button>
    </div>
  );
};
