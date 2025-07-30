import React from 'react';
import { cn } from '../../utils/cn';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, size = 'xl', padding = 'md', ...props }, ref) => {
    
    // TV Compose padding values
    const paddingClasses = {
      'none': '',
      'sm': 'px-tv-sm sm:px-tv-md',      // 16px / 24px
      'md': 'px-tv-md sm:px-tv-lg',      // 24px / 32px
      'lg': 'px-tv-lg sm:px-tv-xl',      // 32px / 48px  
      'xl': 'px-tv-xl sm:px-tv-2xl',     // 48px / 64px
    };

    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto',
          paddingClasses[padding],
          {
            // TV-optimized container sizes
            'max-w-screen-sm': size === 'sm',        // 640px
            'max-w-screen-md': size === 'md',        // 768px
            'max-w-screen-lg': size === 'lg',        // 1024px
            'max-w-screen-xl': size === 'xl',        // 1280px
            'max-w-screen-2xl': size === '2xl',      // 1536px
            'max-w-none': size === 'full',
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

Container.displayName = 'Container'; 