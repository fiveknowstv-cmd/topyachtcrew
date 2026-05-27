'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'navy' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export function Button({
  children,
  className,
  variant = 'gold',
  size = 'md',
  asChild,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    gold: 'btn-gold focus:ring-[var(--gold)]',
    navy: 'btn-navy focus:ring-[var(--navy)]',
    outline:
      'border-2 border-white/30 text-white hover:bg-white/10 hover:text-white',
    ghost: 'text-[var(--navy)] hover:bg-[var(--navy)]/5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const buttonClasses = cn(baseStyles, variants[variant], sizes[size], className);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      className: cn(buttonClasses, (children as any).props?.className),
      ...props,
    });
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
