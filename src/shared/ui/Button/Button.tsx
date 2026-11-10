import type { ComponentProps } from 'react';
import { cn } from '../../lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  ...props }: ButtonProps) {

  return (
    <button
          className={cn(
        'rounded-md font-medium transition-colors focus:outline-none flex items-center justify-center gap-2',
        VARIANTS[variant], 
        SIZES[size], 
        className)}
      {...props}
    />
  );
}