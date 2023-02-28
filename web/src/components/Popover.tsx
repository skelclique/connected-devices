import { ReactNode } from 'react';

import * as RadixPopover from '@radix-ui/react-popover';

import clsx from 'clsx';

interface PopoverProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export function Popover({
  open,
  setOpen,
  children,
}: PopoverProps) {
  return (
    <RadixPopover.Root open={open} onOpenChange={setOpen}>
      <RadixPopover.Trigger asChild>
        {children} 
      </RadixPopover.Trigger>
      <RadixPopover.Content
        align="center"
        side="bottom"
        sideOffset={4}
        className={clsx(
          'z-50 w-16 rounded-md h-6 border border-secondary dark:border-primary',
          'bg-primary dark:bg-secondary flex items-center justify-center text-xs font-semibold',
          'text-secondary dark:text-primary'
        )}
      >
        Copied!
      </RadixPopover.Content>
    </RadixPopover.Root>
  );
}
