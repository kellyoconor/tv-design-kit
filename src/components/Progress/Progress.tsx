import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'linear' | 'circular';
  type?: 'determinate' | 'indeterminate';
  color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export interface ProgressLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({
    className,
    value,
    max = 100,
    size = 'md',
    variant = 'linear',
    type = 'determinate',
    color = 'primary',
    showLabel = false,
    label,
    ...props
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Size configurations
    const sizeConfig = {
      sm: {
        height: 'h-1',
        circularSize: 'w-8 h-8',
        strokeWidth: 2,
      },
      md: {
        height: 'h-2',
        circularSize: 'w-12 h-12',
        strokeWidth: 3,
      },
      lg: {
        height: 'h-3',
        circularSize: 'w-16 h-16',
        strokeWidth: 4,
      },
    };

    const config = sizeConfig[size];

    // Color configurations (TV Compose colors)
    const colorConfig = {
      primary: 'bg-tv-compose-primary-40',
      secondary: 'bg-tv-compose-secondary-40',
      tertiary: 'bg-tv-compose-tertiary-40',
      error: 'bg-tv-compose-error-40',
      success: 'bg-tv-compose-tertiary-60',
    };

    if (variant === 'circular') {
      const radius = size === 'sm' ? 14 : size === 'md' ? 20 : 28;
      const circumference = 2 * Math.PI * radius;
      const strokeDasharray = `${circumference} ${circumference}`;
      const strokeDashoffset = circumference - (percentage / 100) * circumference;

      return (
        <div
          ref={ref}
          className={cn('flex flex-col items-center gap-2', className)}
          {...props}
        >
          {showLabel && (
            <ProgressLabel>
              {label || `${Math.round(percentage)}%`}
            </ProgressLabel>
          )}
          
          <div className={cn('relative', config.circularSize)}>
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox={`0 0 ${radius * 2 + config.strokeWidth * 2} ${radius * 2 + config.strokeWidth * 2}`}
            >
              {/* Background circle */}
              <circle
                cx={radius + config.strokeWidth}
                cy={radius + config.strokeWidth}
                r={radius}
                stroke="currentColor"
                strokeWidth={config.strokeWidth}
                fill="none"
                className="text-tv-compose-surface-variant opacity-20"
              />
              
              {/* Progress circle */}
              <circle
                cx={radius + config.strokeWidth}
                cy={radius + config.strokeWidth}
                r={radius}
                stroke="currentColor"
                strokeWidth={config.strokeWidth}
                fill="none"
                strokeLinecap="round"
                className={cn(
                  'transition-all duration-300 ease-out',
                  {
                    'text-tv-compose-primary-40': color === 'primary',
                    'text-tv-compose-secondary-40': color === 'secondary',
                    'text-tv-compose-tertiary-40': color === 'tertiary',
                    'text-tv-compose-error-40': color === 'error',
                    'text-tv-compose-tertiary-60': color === 'success',
                  }
                )}
                style={{
                  strokeDasharray,
                  strokeDashoffset: type === 'indeterminate' ? 0 : strokeDashoffset,
                  animation: type === 'indeterminate' ? 'tv-progress-spin 2s linear infinite' : undefined,
                }}
              />
            </svg>
            
            {/* Center label for circular */}
            {showLabel && !label && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-tv-body-small text-tv-compose-on-surface font-medium">
                  {Math.round(percentage)}%
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Linear progress bar
    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        {showLabel && (
          <div className="flex justify-between items-center mb-2">
            <ProgressLabel>
              {label || 'Progress'}
            </ProgressLabel>
            <span className="text-tv-body-small text-tv-compose-on-surface opacity-80">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        
        <div
          className={cn(
            'w-full bg-tv-compose-surface-variant bg-opacity-20 rounded-full overflow-hidden',
            config.height
          )}
        >
          <div
            className={cn(
              'transition-all duration-300 ease-out rounded-full',
              config.height,
              colorConfig[color],
              {
                'animate-pulse': type === 'indeterminate',
              }
            )}
            style={{ 
              width: type === 'indeterminate' ? '100%' : `${percentage}%`,
              animation: type === 'indeterminate' ? 'tv-progress-indeterminate 2s ease-in-out infinite' : undefined,
            }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

// Progress Label Component
export const ProgressLabel = React.forwardRef<HTMLDivElement, ProgressLabelProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'text-tv-body-medium text-tv-compose-on-surface font-medium',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ProgressLabel.displayName = 'ProgressLabel'; 