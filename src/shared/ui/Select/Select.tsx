import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends ComponentProps<'select'> {
  options: SelectOption[];
}

export function Select({ options, className, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        'px-3 py-2 border border-gray-300 rounded-md outline-none bg-white focus:ring-2 focus:ring-blue-500',
        className
      )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
