import React from 'react';
import { cn } from '../../utils/cn';
import { useFocus } from '../../hooks/useFocus';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  direction?: 'right' | 'left' | 'bottom' | 'top' | 'center';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface ModalListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface ModalListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  isActive?: boolean;
  focusable?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  direction = 'center',
  size = 'md',
  className,
}) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Direction-based positioning and animations
  const directionClasses = cn({
    // Center modal (traditional)
    'items-center justify-center': direction === 'center',
    // Drawer modals (Figma TV Compose style)
    'items-center justify-end': direction === 'right',
    'items-center justify-start': direction === 'left', 
    'items-end justify-center': direction === 'bottom',
    'items-start justify-center': direction === 'top',
  });

  const modalClasses = cn(
    // Base modal drawer styles (Figma TV Compose)
    'bg-tv-compose-surface-container rounded-tv-lg shadow-tv-modal',
    'flex flex-col items-center gap-4 p-5',
    'animate-in duration-200 ease-out',
    {
      // Size variants
      'w-[280px] h-[492px]': size === 'sm' && direction !== 'center',
      'w-[320px] h-[540px]': size === 'md' && direction !== 'center', 
      'w-[400px] h-[600px]': size === 'lg' && direction !== 'center',
      'w-[480px] h-[680px]': size === 'xl' && direction !== 'center',
      
      // Center modal sizes (traditional)
      'max-w-sm': size === 'sm' && direction === 'center',
      'max-w-md': size === 'md' && direction === 'center',
      'max-w-lg': size === 'lg' && direction === 'center',
      'max-w-xl': size === 'xl' && direction === 'center',
      
      // Direction-based animations
      'slide-in-from-right': direction === 'right',
      'slide-in-from-left': direction === 'left',
      'slide-in-from-bottom': direction === 'bottom',
      'slide-in-from-top': direction === 'top',
      'fade-in zoom-in-95': direction === 'center',
    },
    className
  );

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex p-6',
      directionClasses
    )}>
      {/* Scrim (TV Compose style - black with 0.6 opacity) */}
      <div
        className="absolute inset-0 bg-tv-compose-black opacity-60"
        onClick={onClose}
      />
      
      {/* Modal Drawer */}
      <div className={modalClasses}>
        {/* Default header if title provided */}
        {title && (
          <ModalHeader onClose={onClose} showCloseButton>
            {title}
          </ModalHeader>
        )}
        
        {/* Content */}
        <div className="flex-1 w-full overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

// Modal Header Component
export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, children, onClose, showCloseButton = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center w-full px-4 py-2',
        showCloseButton ? 'justify-between' : 'justify-start',
        className
      )}
      {...props}
    >
      <h2 className="text-tv-title-large text-tv-compose-on-surface flex-1">
        {children}
      </h2>
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className={cn(
            'ml-2 p-1 rounded-tv-sm',
            'text-tv-compose-on-surface opacity-70 hover:opacity-100',
            'transition-opacity duration-200',
            'focus:outline-none focus:ring-2 focus:ring-tv-compose-primary-40'
          )}
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
);
ModalHeader.displayName = 'ModalHeader';

// Modal Content Component
export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1 w-full px-4 pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);
ModalContent.displayName = 'ModalContent';

// Modal List Component (for drawer-style lists)
export const ModalList = React.forwardRef<HTMLDivElement, ModalListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col w-full gap-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ModalList.displayName = 'ModalList';

// Modal List Item Component
export const ModalListItem = React.forwardRef<HTMLDivElement, ModalListItemProps>(
  ({ 
    className, 
    children, 
    icon, 
    isActive = false, 
    focusable = false,
    onClick,
    ...props 
  }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLDivElement>();

    // Combine refs
    React.useImperativeHandle(ref, () => focusRef.current!, []);

    const Component = onClick || focusable ? 'div' : 'div';
    const interactiveProps = onClick || focusable ? {
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
      <Component
        ref={focusRef}
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-tv-sm',
          'transition-all duration-200',
          'text-tv-body-large text-tv-compose-on-surface',
          {
            // Active state
            'bg-tv-compose-primary-40 text-tv-compose-white': isActive,
            // Focused state
            'bg-tv-compose-surface-variant scale-105': isFocused && (focusable || onClick),
            // Interactive states
            'cursor-pointer hover:bg-tv-compose-surface-variant': onClick || focusable,
            'focus:outline-none': focusable || onClick,
          },
          className
        )}
        {...interactiveProps}
        {...props}
      >
        {icon && (
          <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </Component>
    );
  }
);
ModalListItem.displayName = 'ModalListItem'; 