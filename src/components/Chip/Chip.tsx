import React from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../Text/Text';
import { useFocus } from '../../hooks/useFocus';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'filter' | 'input' | 'suggestion' | 'action';
  selected?: boolean;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  image?: string;
  onSelect?: () => void;
  onRemove?: () => void;
  focusable?: boolean;
  className?: string;
}

export interface ChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  wrap?: boolean;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({
    children,
    variant = 'filter',
    selected = false,
    disabled = false,
    leadingIcon,
    trailingIcon,
    image,
    onSelect,
    onRemove,
    focusable = true,
    className,
    ...props
  }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLDivElement>();

    // Combine refs
    React.useImperativeHandle(ref, () => focusRef.current!, []);

    const handleClick = () => {
      if (disabled) return;
      if (onSelect) {
        onSelect();
      }
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      if (onRemove) {
        onRemove();
      }
    };

    const isInteractive = !disabled && (onSelect || focusable);

    // Determine state-based styling
    const getStateStyles = () => {
      if (disabled) {
        return 'bg-tv-compose-surface-variant opacity-50 text-tv-compose-on-surface border border-tv-compose-outline';
      }
      if (selected) {
        return 'bg-tv-compose-primary-40 text-tv-compose-white border border-tv-compose-primary-40';
      }
      return 'bg-tv-compose-surface-variant text-tv-compose-on-surface border border-tv-compose-outline';
    };

    const baseClasses = cn(
      'inline-flex items-center gap-2 px-4 py-2 min-h-[32px]',
      'rounded-tv-md transition-all duration-200',
      'text-tv-label-large',
      getStateStyles(),
      {
        // Interactive states
        'cursor-pointer': isInteractive,
        'hover:bg-tv-compose-primary-50': !selected && isInteractive,
        'hover:bg-tv-compose-primary-30': selected && isInteractive,
        
        // Focus state
        'scale-105 shadow-tv-focus': isFocused && isInteractive,
      },
      className
    );

    const interactiveProps = isInteractive ? {
      role: 'button',
      tabIndex: 0,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      },
      onClick: handleClick,
      ...focusProps,
    } : {};

    return (
      <div
        ref={focusRef}
        className={baseClasses}
        {...interactiveProps}
        {...props}
      >
        {/* Leading Image */}
        {image && (
          <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={image} 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Leading Icon */}
        {leadingIcon && !image && (
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            {leadingIcon}
          </div>
        )}

        {/* Content */}
        <span className="truncate flex-1 min-w-0">
          {children}
        </span>

        {/* Trailing Icon / Remove Button */}
        {trailingIcon && (
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
            {onRemove ? (
              <button
                onClick={handleRemove}
                disabled={disabled}
                className={cn(
                  'w-full h-full flex items-center justify-center rounded-full',
                  'transition-colors duration-200',
                  {
                    'hover:bg-tv-compose-on-surface hover:bg-opacity-10': !disabled,
                    'cursor-pointer': !disabled,
                  }
                )}
                aria-label="Remove"
              >
                {trailingIcon}
              </button>
            ) : (
              trailingIcon
            )}
          </div>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';

// Chip Group Component
export const ChipGroup = React.forwardRef<HTMLDivElement, ChipGroupProps>(
  ({ 
    children, 
    orientation = 'horizontal', 
    wrap = true,
    gap = 'md',
    className, 
    ...props 
  }, ref) => {
    
    const gapClasses = {
      'sm': 'gap-tv-sm',    // 16px
      'md': 'gap-tv-md',    // 24px  
      'lg': 'gap-tv-lg',    // 32px
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          gapClasses[gap],
          {
            'flex-row': orientation === 'horizontal',
            'flex-col': orientation === 'vertical',
            'flex-wrap': wrap && orientation === 'horizontal',
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

ChipGroup.displayName = 'ChipGroup'; 