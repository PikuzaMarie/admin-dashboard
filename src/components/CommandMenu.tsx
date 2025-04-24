import { Command } from 'cmdk';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { SIDEBAR_ITEMS } from '../constants';
import { LogOut } from '../features/auth/LogOut';

interface CommandMenuProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ open, setOpen }) => {
  const [inputValue, setInputValue] = useState('');

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(open => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="fixed inset-0 bg-stone-950/50"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="mx-auto mt-12 w-full max-w-lg overflow-hidden rounded-lg border border-stone-300 bg-white shadow-xl"
      >
        <Command.Input
          value={inputValue}
          onValueChange={setInputValue}
          placeholder="What are you looking for?"
          className="relative w-full border-b border-stone-300 p-3 text-lg placeholder:text-stone-400 focus:outline-none"
        />
        <Command.List className="m-3">
          <Command.Empty>
            No results found for
            <span className="text-violet-500">"{inputValue}"</span>
          </Command.Empty>

          <Command.Group
            heading="Pages"
            className="mb-3 text-sm text-stone-400"
          >
            {SIDEBAR_ITEMS.map(({ Icon, name, href }) => (
              <Link to={href}>
                <Command.Item className="flex cursor-pointer items-center gap-2 rounded p-2 text-sm text-stone-950 transition-colors hover:bg-stone-200">
                  <Icon />
                  {name}
                </Command.Item>
              </Link>
            ))}
          </Command.Group>
          <Command.Item className="p-2">
            <LogOut />
          </Command.Item>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};
