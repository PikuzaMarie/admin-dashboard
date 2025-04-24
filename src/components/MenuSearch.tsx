import React, { useState } from 'react';

import { CommandMenu } from './CommandMenu';
import { Search } from './UI/Search';

export const MenuSearch: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Search isMenuSearch={true} placeholder="Search" />
      <CommandMenu open={open} setOpen={setOpen} />
    </>
  );
};
