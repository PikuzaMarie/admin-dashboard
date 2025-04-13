import { FiCommand, FiSearch } from 'react-icons/fi';

export const Search: React.FC = () => {
  return (
    <>
      <div className="realtive mb-4 flex items-center rounded bg-stone-200 px-2 py-1.5 text-sm">
        <FiSearch className="mr-2" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
        />
        <span className="relative top-1/2 right-1.5 flex items-center gap-0.5 rounded bg-stone-50 p-1 text-xs shadow">
          <FiCommand />K
        </span>
      </div>
    </>
  );
};
