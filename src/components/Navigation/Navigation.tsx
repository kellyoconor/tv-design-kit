import React from 'react';
import { cn } from '../../utils/cn';
import { useFocus } from '../../hooks/useFocus';

export interface NavigationItem {
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  isExpanded?: boolean;
  children?: NavigationItem[];
}

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: NavigationItem[];
  variant?: 'drawer' | 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  className?: string;
}

export interface NavigationItemProps extends React.HTMLAttributes<HTMLDivElement> {
  item: NavigationItem;
  isNested?: boolean;
  className?: string;
}

export const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({ 
    className, 
    items, 
    variant = 'drawer', 
    size = 'md',
    title,
    ...props 
  }, ref) => {
    
    const containerClasses = cn(
      'flex bg-tv-compose-surface-container rounded-tv-lg',
      {
        // Drawer (TV Compose style)
        'flex-col gap-1 p-5 w-[280px]': variant === 'drawer',
        // Horizontal navigation
        'flex-row gap-2 p-4': variant === 'horizontal',
        // Vertical navigation 
        'flex-col gap-1 p-4': variant === 'vertical',
      },
      {
        // Size variants
        'text-tv-body-small': size === 'sm',
        'text-tv-body-medium': size === 'md', 
        'text-tv-body-large': size === 'lg',
      },
      className
    );

    return (
      <nav
        ref={ref}
        className={containerClasses}
        {...props}
      >
        {/* Title/Header */}
        {title && variant === 'drawer' && (
          <div className="flex items-center px-4 py-2 mb-2">
            <h2 className="text-tv-title-large text-tv-compose-on-surface flex-1">
              {title}
            </h2>
          </div>
        )}
        
        {/* Navigation Items */}
        <div className={cn(
          'flex gap-1',
          {
            'flex-col': variant === 'drawer' || variant === 'vertical',
            'flex-row': variant === 'horizontal',
          }
        )}>
          {items.map((item, index) => (
            <NavigationItem 
              key={index} 
              item={item} 
              className={size === 'sm' ? 'py-2' : size === 'lg' ? 'py-4' : 'py-3'}
            />
          ))}
        </div>
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation';

// Navigation Item Component
export const NavigationItem = React.forwardRef<HTMLDivElement, NavigationItemProps>(
  ({ item, isNested = false, className, ...props }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLDivElement>();
    const [isExpanded, setIsExpanded] = React.useState(item.isExpanded || false);

    // Combine refs
    React.useImperativeHandle(ref, () => focusRef.current!, []);

    const handleClick = () => {
      if (item.children && item.children.length > 0) {
        setIsExpanded(!isExpanded);
      }
      if (item.onClick) {
        item.onClick();
      }
    };

    const baseClasses = cn(
      'flex items-center w-full px-4 rounded-tv-sm',
      'transition-all duration-200',
      'text-tv-body-large text-tv-compose-on-surface',
      {
        // Nested indentation
        'pl-8': isNested,
        
        // Active state (TV Compose style)
        'bg-tv-compose-primary-40 text-tv-compose-white': item.isActive,
        
        // Focused state
        'bg-tv-compose-surface-variant scale-105 shadow-tv-focus': 
          isFocused && !item.isActive,
        
        // Interactive states
        'cursor-pointer hover:bg-tv-compose-surface-variant': 
          !item.isActive && (item.href || item.onClick || (item.children && item.children.length > 0)),
        
        // Default state
        'hover:bg-tv-compose-neutral-variant-10': 
          !item.isActive && !isFocused,
      },
      className
    );

    const interactiveProps = (item.href || item.onClick || (item.children && item.children.length > 0)) ? {
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

    const renderContent = () => (
      <>
        {/* Icon */}
        {item.icon && (
          <div className="w-6 h-6 mr-3 flex items-center justify-center flex-shrink-0">
            {item.icon}
          </div>
        )}
        
        {/* Label */}
        <span className="flex-1 min-w-0 truncate">
          {item.label}
        </span>
        
        {/* Badge */}
        {item.badge && (
          <div className={cn(
            'ml-2 px-2 py-0.5 rounded-full text-tv-label-small',
            'bg-tv-compose-primary-40 text-tv-compose-white',
            'flex-shrink-0'
          )}>
            {item.badge}
          </div>
        )}
        
        {/* Expand/Collapse Icon */}
        {item.children && item.children.length > 0 && (
          <div className={cn(
            'ml-2 w-4 h-4 flex items-center justify-center',
            'text-tv-compose-on-surface opacity-70',
            'transition-transform duration-200',
            {
              'rotate-90': isExpanded,
            }
          )}>
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
              <path d="M6 4l4 4-4 4V4z" />
            </svg>
          </div>
        )}
      </>
    );

    return (
      <div className="w-full">
        {item.href ? (
          <a
            href={item.href}
            className={baseClasses}
            {...interactiveProps}
          >
            {renderContent()}
          </a>
        ) : (
          <div
            ref={focusRef}
            className={baseClasses}
            {...interactiveProps}
            {...props}
          >
            {renderContent()}
          </div>
        )}
        
        {/* Nested Items */}
        {item.children && item.children.length > 0 && isExpanded && (
          <div className="mt-1 ml-4 space-y-1">
            {item.children.map((childItem, childIndex) => (
              <NavigationItem 
                key={childIndex} 
                item={childItem} 
                isNested={true}
                className={className}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

NavigationItem.displayName = 'NavigationItem'; 