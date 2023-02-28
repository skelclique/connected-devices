import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ 
  children, 
  ...rest 
}: ButtonProps) {
  return (
    <button
      className="flex items-center justify-center gap-2 font-semibold transition-colors h-12 px-6 rounded-lg bg-transparent text-secondary border border-secondary hover:bg-secondary hover:text-primary dark:text-primary dark:border-primary dark:hover:bg-primary dark:hover:text-secondary"
      {...rest}
    >
      {children}
    </button>
  );
}
