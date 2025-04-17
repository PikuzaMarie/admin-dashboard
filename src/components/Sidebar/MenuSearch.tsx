import React, { useState } from 'react';

import { Search } from '../Search';
import { CommandMenu } from './CommandMenu';

export const MenuSearch: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Search isMenuSearch={true} placeholder="Search" />
      <CommandMenu open={open} setOpen={setOpen} />
    </>
  );
};
