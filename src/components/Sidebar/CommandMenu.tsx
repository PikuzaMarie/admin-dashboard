import { Command } from 'cmdk';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FiEye, FiLink, FiLogOut, FiPhone, FiPlus } from 'react-icons/fi';

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

          <CustomCommandGroup heading="Team">
            <CustomCommandItem>
              <FiPlus /> Invite Member
            </CustomCommandItem>
            <CustomCommandItem>
              <FiEye />
              See org chart
            </CustomCommandItem>
          </CustomCommandGroup>

          <CustomCommandGroup heading="Integrations">
            <CustomCommandItem>
              <FiLink />
              Link Services
            </CustomCommandItem>
            <CustomCommandItem>
              <FiPhone />
              Contact Support
            </CustomCommandItem>
          </CustomCommandGroup>

          <CustomCommandItem>
            <FiLogOut />
            Sign Out
          </CustomCommandItem>
        </Command.List>
      </div>
    </Command.Dialog>
  );
};

const CustomCommandItem: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Command.Item className="flex cursor-pointer items-center gap-2 rounded p-2 text-sm text-stone-950 transition-colors hover:bg-stone-200">
      {children}
    </Command.Item>
  );
};

const CustomCommandGroup: React.FC<{
  heading?: React.ReactNode;
  children: React.ReactNode;
}> = ({ heading, children }) => {
  return (
    <Command.Group heading={heading} className="mb-3 text-sm text-stone-400">
      {children}
    </Command.Group>
  );
};
