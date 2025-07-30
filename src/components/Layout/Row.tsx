import React from 'react';
import { cn } from '../../utils/cn';

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  className?: string;
}

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ 
    className, 
    children, 
    gap = 'md', 
    align = 'start', 
    justify = 'start', 
    wrap = false,
    ...props 
  }, ref) => {
    
    // TV Compose spacing values
    const gapClasses = {
      'xs': 'gap-tv-xs',     // 8px
      'sm': 'gap-tv-sm',     // 16px  
      'md': 'gap-tv-md',     // 24px
      'lg': 'gap-tv-lg',     // 32px
      'xl': 'gap-tv-xl',     // 48px
      '2xl': 'gap-tv-2xl',   // 64px
      '3xl': 'gap-tv-3xl',   // 96px
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          {
            'flex-wrap': wrap,
          },
          gapClasses[gap],
          {
            // Align variants
            'items-start': align === 'start',
            'items-center': align === 'center',
            'items-end': align === 'end',
            'items-stretch': align === 'stretch',
            'items-baseline': align === 'baseline',
          },
          {
            // Justify variants
            'justify-start': justify === 'start',
            'justify-center': justify === 'center',
            'justify-end': justify === 'end',
            'justify-between': justify === 'between',
            'justify-around': justify === 'around',
            'justify-evenly': justify === 'evenly',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Row.displayName = 'Row'; 