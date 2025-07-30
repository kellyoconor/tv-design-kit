import React from 'react';
import { cn } from '../../utils/cn';
import { useFocus } from '../../hooks/useFocus';
import { Text } from '../Text/Text';

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  primaryText: string;
  secondaryText?: string;
  tertiaryText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  leadingImage?: string;
  trailingElement?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  focusable?: boolean;
  divider?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'dense' | 'comfortable';
  dividers?: boolean;
  className?: string;
}

export interface ListSubheaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ children, variant = 'default', dividers = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-tv-compose-surface rounded-tv-md',
          {
            'space-y-0': variant === 'dense',
            'space-y-1': variant === 'default',
            'space-y-2': variant === 'comfortable',
          },
          className
        )}
        role="list"
        {...props}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === ListItem) {
            return React.cloneElement(child as React.ReactElement<ListItemProps>, {
              divider: dividers && index < React.Children.count(children) - 1,
            });
          }
          return child;
        })}
      </div>
    );
  }
);

List.displayName = 'List';

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({
    children,
    primaryText,
    secondaryText,
    tertiaryText,
    leadingIcon,
    trailingIcon,
    leadingImage,
    trailingElement,
    selected = false,
    disabled = false,
    focusable = true,
    divider = false,
    size = 'md',
    onClick,
    className,
    ...props
  }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLDivElement>();

    // Combine refs
    React.useImperativeHandle(ref, () => focusRef.current!, []);

    const isInteractive = !disabled && (onClick || focusable);

    // Size configurations
    const sizeConfig = {
      sm: {
        padding: 'px-4 py-2',
        leadingSize: 'w-8 h-8',
        iconSize: 'w-5 h-5',
        imageSize: 'w-8 h-8',
        primaryVariant: 'body-medium' as const,
        secondaryVariant: 'body-small' as const,
      },
      md: {
        padding: 'px-4 py-3',
        leadingSize: 'w-10 h-10',
        iconSize: 'w-6 h-6',
        imageSize: 'w-10 h-10',
        primaryVariant: 'body-large' as const,
        secondaryVariant: 'body-medium' as const,
      },
      lg: {
        padding: 'px-6 py-4',
        leadingSize: 'w-12 h-12',
        iconSize: 'w-7 h-7',
        imageSize: 'w-12 h-12',
        primaryVariant: 'title-medium' as const,
        secondaryVariant: 'body-large' as const,
      },
    };

    const config = sizeConfig[size];

    const interactiveProps = isInteractive ? {
      role: 'button',
      tabIndex: 0,
      onKeyDown: (e: React.KeyboardEvent) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      },
      onClick,
      ...focusProps,
    } : {};

    return (
      <div className="relative">
        <div
          ref={focusRef}
          className={cn(
            'flex items-center gap-3 transition-all duration-200',
            config.padding,
            {
              // Selected state
              'bg-tv-compose-primary-40 text-tv-compose-white': selected && !disabled,
              
              // Interactive states
              'cursor-pointer hover:bg-tv-compose-surface-variant': isInteractive && !selected,
              
              // Disabled state
              'opacity-50': disabled,
              
              // Focus state
              'bg-tv-compose-surface-variant scale-[1.02] shadow-tv-focus': 
                isFocused && isInteractive && !selected,
              'ring-2 ring-tv-compose-white ring-opacity-50': 
                isFocused && selected,
            },
            className
          )}
          {...interactiveProps}
          {...props}
        >
          {/* Leading Image */}
          {leadingImage && (
            <div className={cn('rounded-full overflow-hidden flex-shrink-0', config.imageSize)}>
              <img 
                src={leadingImage} 
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Leading Icon */}
          {leadingIcon && !leadingImage && (
            <div className={cn(
              'flex items-center justify-center flex-shrink-0',
              config.leadingSize,
              {
                'text-tv-compose-on-surface': !selected,
                'text-tv-compose-white': selected,
              }
            )}>
              <div className={config.iconSize}>
                {leadingIcon}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Primary Text */}
            <Text 
              variant={config.primaryVariant}
              className={cn(
                'truncate',
                {
                  'text-tv-compose-on-surface': !selected,
                  'text-tv-compose-white': selected,
                }
              )}
            >
              {primaryText}
            </Text>

            {/* Secondary Text */}
            {secondaryText && (
              <Text 
                variant={config.secondaryVariant}
                className={cn(
                  'truncate mt-0.5',
                  {
                    'text-tv-compose-on-surface opacity-70': !selected,
                    'text-tv-compose-white opacity-80': selected,
                  }
                )}
              >
                {secondaryText}
              </Text>
            )}

            {/* Tertiary Text */}
            {tertiaryText && (
              <Text 
                variant="body-small"
                className={cn(
                  'truncate mt-0.5',
                  {
                    'text-tv-compose-on-surface opacity-60': !selected,
                    'text-tv-compose-white opacity-70': selected,
                  }
                )}
              >
                {tertiaryText}
              </Text>
            )}

            {/* Custom Children */}
            {children && (
              <div className="mt-2">
                {children}
              </div>
            )}
          </div>

          {/* Trailing Element */}
          {trailingElement && (
            <div className="flex-shrink-0">
              {trailingElement}
            </div>
          )}

          {/* Trailing Icon */}
          {trailingIcon && !trailingElement && (
            <div className={cn(
              'flex items-center justify-center flex-shrink-0',
              config.iconSize,
              {
                'text-tv-compose-on-surface opacity-70': !selected,
                'text-tv-compose-white': selected,
              }
            )}>
              {trailingIcon}
            </div>
          )}
        </div>

        {/* Divider */}
        {divider && (
          <div className="border-b border-tv-compose-outline mx-4" />
        )}
      </div>
    );
  }
);

ListItem.displayName = 'ListItem';

// List Subheader Component
export const ListSubheader = React.forwardRef<HTMLDivElement, ListSubheaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'px-4 py-2 border-b border-tv-compose-outline',
        className
      )}
      {...props}
    >
      <Text 
        variant="title-small" 
        color="on-surface"
        className="font-medium"
      >
        {children}
      </Text>
    </div>
  )
);

ListSubheader.displayName = 'ListSubheader'; 