import React from 'react';
import { cn } from '../../utils/cn';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  responsive?: boolean;
  autoFit?: boolean;
  minItemWidth?: string;
  className?: string;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ 
    className, 
    children, 
    cols = 4, 
    gap = 'md', 
    responsive = false,
    autoFit = false,
    minItemWidth = '200px',
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

    // Auto-fit grid using CSS Grid
    if (autoFit) {
      return (
        <div
          ref={ref}
          className={cn(
            'grid',
            gapClasses[gap],
            className
          )}
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
          }}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Responsive grid 
    if (responsive) {
      return (
        <div
          ref={ref}
          className={cn(
            'grid',
            // Responsive breakpoints for TV interfaces
            'grid-cols-1',           // Mobile: 1 column
            'sm:grid-cols-2',        // Small: 2 columns
            'md:grid-cols-3',        // Medium: 3 columns  
            'lg:grid-cols-4',        // Large: 4 columns
            'xl:grid-cols-5',        // XL: 5 columns
            '2xl:grid-cols-6',       // 2XL: 6 columns
            gapClasses[gap],
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    // Fixed column grid
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          {
            // Column variants - TV optimized
            'grid-cols-1': cols === 1,
            'grid-cols-2': cols === 2,
            'grid-cols-3': cols === 3,
            'grid-cols-4': cols === 4,
            'grid-cols-5': cols === 5,
            'grid-cols-6': cols === 6,
            'grid-cols-7': cols === 7,
            'grid-cols-8': cols === 8,
            'grid-cols-9': cols === 9,
            'grid-cols-10': cols === 10,
            'grid-cols-11': cols === 11,
            'grid-cols-12': cols === 12,
          },
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid'; 