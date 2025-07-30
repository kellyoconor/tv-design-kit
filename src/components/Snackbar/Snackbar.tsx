import React from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../Text/Text';

export interface SnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'leading-icon' | 'trailing-icon' | 'both-icons';
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  autoHideDuration?: number;
  position?: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}

export interface SnackbarActionProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  ({
    children,
    variant = 'default',
    leadingIcon,
    trailingIcon,
    open = false,
    onClose,
    autoHideDuration = 4000,
    position = 'bottom',
    className,
    ...props
  }, ref) => {
    
    // Auto-hide functionality
    React.useEffect(() => {
      if (open && autoHideDuration > 0 && onClose) {
        const timer = setTimeout(() => {
          onClose();
        }, autoHideDuration);

        return () => clearTimeout(timer);
      }
    }, [open, autoHideDuration, onClose]);

    // Determine icons based on variant
    const getIcons = () => {
      switch (variant) {
        case 'leading-icon':
          return { leading: leadingIcon, trailing: null };
        case 'trailing-icon':
          return { leading: null, trailing: trailingIcon };
        case 'both-icons':
          return { leading: leadingIcon, trailing: trailingIcon };
        default:
          return { leading: null, trailing: null };
      }
    };

    const { leading, trailing } = getIcons();

    // Position classes
    const positionClasses = cn({
      'top-4 left-1/2 transform -translate-x-1/2': position === 'top',
      'bottom-4 left-1/2 transform -translate-x-1/2': position === 'bottom',
      'top-4 left-4': position === 'top-left',
      'top-4 right-4': position === 'top-right',
      'bottom-4 left-4': position === 'bottom-left',
      'bottom-4 right-4': position === 'bottom-right',
    });

    if (!open) return null;

    return (
      <div
        className={cn(
          'fixed z-50 pointer-events-none',
          positionClasses
        )}
      >
        <div
          ref={ref}
          className={cn(
            // Base Snackbar styles (from Figma)
            'flex items-center gap-2 px-4 py-3 pointer-events-auto',
            'bg-tv-compose-inverse-surface text-tv-compose-inverse-on-surface',
            'rounded-tv-md shadow-tv-snackbar',
            'animate-in slide-in-from-bottom-2 duration-300',
            
            // Size based on variant (from Figma specs)
            {
              'w-[196px] h-[44px] px-4 py-3': variant === 'default',
              'w-[244px] h-[56px] px-4 py-3': variant === 'leading-icon' || variant === 'trailing-icon',
              'w-[276px] h-[56px] px-4 py-3': variant === 'both-icons',
            },
            className
          )}
          {...props}
        >
          {/* Leading Icon */}
          {leading && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-tv-compose-on-surface-variant bg-opacity-80 flex-shrink-0">
              <div className="w-4 h-4 text-tv-compose-inverse-on-surface">
                {leading}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Text 
              variant="label-large" 
              color="inverse-on-surface"
              className="truncate"
            >
              {children}
            </Text>
          </div>

          {/* Trailing Icon */}
          {trailing && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-tv-compose-on-surface-variant bg-opacity-80 flex-shrink-0">
              <div className="w-4 h-4 text-tv-compose-inverse-on-surface">
                {trailing}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Snackbar.displayName = 'Snackbar';

// Snackbar Action Component (for buttons within snackbar)
export const SnackbarAction = React.forwardRef<HTMLButtonElement, SnackbarActionProps>(
  ({ children, onClick, className, ...props }, ref) => (
    <button
      ref={ref}
      onClick={onClick}
      className={cn(
        'px-3 py-1 rounded-tv-sm',
        'text-tv-label-medium text-tv-compose-primary-40',
        'hover:bg-tv-compose-primary-40 hover:bg-opacity-10',
        'focus:outline-none focus:ring-2 focus:ring-tv-compose-primary-40',
        'transition-colors duration-200',
        'flex-shrink-0',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

SnackbarAction.displayName = 'SnackbarAction'; 