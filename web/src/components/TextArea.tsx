import clsx from 'clsx';

import { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ 
  ...rest
}: TextAreaProps) {
  return (
    <textarea
      className={clsx(
        'border border-secondary bg-transparent rounded-lg p-4 h-full w-full resize-none text-secondary placeholder:text-secondary',
        'dark:border-primary dark:text-primary dark:placeholder:text-primary', { 
          'selection:bg-primary selection:bg-opacity-25': localStorage.theme === 'dark',
          'selection:bg-secondary selection:bg-opacity-25': localStorage.theme === 'light' ,
        }
      )}
      {...rest}
    />
  );
}
