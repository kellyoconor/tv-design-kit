import React from 'react';
import { cn } from '../../utils/cn';
import { useFocus } from '../../hooks/useFocus';
import { Text } from '../Text/Text';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  content?: React.ReactNode;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export interface TabProps extends React.HTMLAttributes<HTMLButtonElement> {
  item: TabItem;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  onSelect?: () => void;
  className?: string;
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({
    items,
    activeTab,
    onTabChange,
    variant = 'primary',
    size = 'md',
    orientation = 'horizontal',
    className,
    ...props
  }, ref) => {
    const [internalActiveTab, setInternalActiveTab] = React.useState(
      activeTab || items[0]?.id || ''
    );

    const currentActiveTab = activeTab || internalActiveTab;

    const handleTabSelect = (tabId: string) => {
      if (onTabChange) {
        onTabChange(tabId);
      } else {
        setInternalActiveTab(tabId);
      }
    };

    const activeItem = items.find(item => item.id === currentActiveTab);

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          {
            'flex-col': orientation === 'horizontal',
            'flex-row': orientation === 'vertical',
          },
          className
        )}
        {...props}
      >
        {/* Tab List */}
        <div
          className={cn(
            'flex bg-tv-compose-surface-container rounded-tv-md p-1',
            {
              'flex-row': orientation === 'horizontal',
              'flex-col': orientation === 'vertical',
              'w-fit': orientation === 'vertical',
            }
          )}
          role="tablist"
          aria-orientation={orientation}
        >
          {items.map((item) => (
            <Tab
              key={item.id}
              item={item}
              isActive={currentActiveTab === item.id}
              size={size}
              variant={variant}
              onSelect={() => handleTabSelect(item.id)}
            />
          ))}
        </div>

        {/* Tab Panel */}
        {activeItem?.content && (
          <TabPanel isActive={true} className="mt-4">
            {activeItem.content}
          </TabPanel>
        )}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';

// Individual Tab Component
export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
  ({ item, isActive = false, size = 'md', variant = 'primary', onSelect, className, ...props }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLButtonElement>();

    // Combine refs
    React.useImperativeHandle(ref, () => focusRef.current!, []);

    const sizeConfig = {
      sm: {
        padding: 'px-3 py-2',
        textVariant: 'label-medium' as const,
        iconSize: 'w-4 h-4',
      },
      md: {
        padding: 'px-4 py-3',
        textVariant: 'label-large' as const,
        iconSize: 'w-5 h-5',
      },
      lg: {
        padding: 'px-6 py-4',
        textVariant: 'title-small' as const,
        iconSize: 'w-6 h-6',
      },
    };

    const config = sizeConfig[size];

    return (
      <button
        ref={focusRef}
        type="button"
        role="tab"
        aria-selected={isActive}
        disabled={item.disabled}
        onClick={onSelect}
        className={cn(
          'flex items-center gap-2 rounded-tv-sm transition-all duration-200',
          'focus:outline-none',
          config.padding,
          {
            // Active state
            'bg-tv-compose-primary-40 text-tv-compose-white': isActive && variant === 'primary',
            'bg-tv-compose-secondary-40 text-tv-compose-white': isActive && variant === 'secondary',
            
            // Inactive state
            'text-tv-compose-on-surface hover:bg-tv-compose-surface-variant': !isActive && !item.disabled,
            
            // Disabled state
            'text-tv-compose-on-surface opacity-50 cursor-not-allowed': item.disabled,
            
            // Focus state
            'ring-2 ring-tv-compose-primary-40 ring-offset-2 ring-offset-tv-compose-surface-container': 
              isFocused && !item.disabled,
            'scale-105': isFocused && !item.disabled,
          },
          className
        )}
        {...focusProps}
        {...props}
      >
        {/* Icon */}
        {item.icon && (
          <div className={cn('flex-shrink-0', config.iconSize)}>
            {item.icon}
          </div>
        )}

        {/* Label */}
        <Text 
          variant={config.textVariant}
          className="flex-1 min-w-0 truncate"
        >
          {item.label}
        </Text>
      </button>
    );
  }
);

Tab.displayName = 'Tab';

// Tab Panel Component
export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(
  ({ children, isActive = false, className, ...props }, ref) => {
    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn(
          'rounded-tv-md p-4',
          'animate-in fade-in-0 duration-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabPanel.displayName = 'TabPanel'; 