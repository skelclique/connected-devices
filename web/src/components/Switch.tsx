import * as RadixSwitch from '@radix-ui/react-switch';

import clsx from 'clsx';

interface SwitchProps {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Switch({ 
  checked, 
  setChecked 
}: SwitchProps) {
  return (
    <RadixSwitch.Root
      className={clsx(
        'bg-secondary w-2 h-2 rounded-full dark:bg-primary absolute translate-x-2 translate-y-1',
        'outline-none ring-2 ring-secondary ring-offset-2 ring-offset-primary dark:outline-none',
        'dark:ring-2 dark:ring-primary dark:ring-offset-2 dark:ring-offset-secondary',
      )}
      onCheckedChange={() => setChecked(!checked)}
      checked={checked}
    >
    </RadixSwitch.Root>
  );
}
