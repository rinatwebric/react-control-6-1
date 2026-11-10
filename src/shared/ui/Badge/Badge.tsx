import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface BadgeProps {
  children: ReactNode;
  variant?: 'easy' | 'medium' | 'hard' | 'default';
  className?: string;
}

const VARIANTS = {
  easy: 'bg-green-100 text-green-800 border-green-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  hard: 'bg-red-100 text-red-800 border-red-300',
  default: 'bg-gray-100 text-gray-800 border-gray-300',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        VARIANTS[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
