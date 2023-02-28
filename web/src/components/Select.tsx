import * as RadixSelect from '@radix-ui/react-select';

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';

interface SelectProps {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  options: string[];
}

export function Select({ setValue, options }: SelectProps) {
  return (
    <RadixSelect.Root defaultValue={options[0]} onValueChange={setValue}>
      <RadixSelect.Trigger className="flex items-center justify-between border text-secondary border-secondary outline-none px-3 py-2 rounded-lg  dark:border-primary dark:text-primary">
        <RadixSelect.Value />
        <RadixSelect.Icon>
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Content className="bg-primary dark:bg-secondary border border-secondary outline-none rounded-lg ring-2 ring-secondary ring-offset-2 ring-offset-primary text-secondary dark:text-primary dark:border-primary dark:ring-primary dark:ring-offset-secondary">
        <RadixSelect.ScrollUpButton>
          <ChevronUpIcon />
        </RadixSelect.ScrollUpButton>
        <RadixSelect.Viewport>
          <RadixSelect.Group>
            {options.map((option) => (
              <RadixSelect.Item
                className="px-3 py-2 outline-none focus:bg-secondary focus:bg-opacity-5 dark:focus:bg-primary dark:focus:bg-opacity-5"
                value={option}
                key={option}
              >
                <RadixSelect.ItemText>{option}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Group>
        </RadixSelect.Viewport>
        <RadixSelect.ScrollDownButton>
          <ChevronDownIcon />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
}
