import React from 'react';
import { cn } from '../../utils/cn';
import { useFocus } from '../../hooks/useFocus';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  variant?: 'basic' | 'full-screen';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  className?: string;
}

export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  className?: string;
}

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface DialogActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  arrangement?: 'horizontal' | 'vertical';
  alignment?: 'start' | 'center' | 'end';
  className?: string;
}

export interface DialogActionProps {
  label: string;
  variant?: 'filled' | 'outline' | 'ghost';
  onClick?: () => void;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({
    open = false,
    onClose,
    title,
    description,
    children,
    variant = 'basic',
    size = 'md',
    showCloseButton = true,
    className,
    ...props
  }, ref) => {
    
    // Auto-focus management and escape key handling
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
        
        const handleEscape = (event: KeyboardEvent) => {
          if (event.key === 'Escape' && onClose) {
            onClose();
          }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => {
          document.removeEventListener('keydown', handleEscape);
        };
      }
      
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [open, onClose]);

    if (!open) return null;

    // Size configurations
    const sizeConfig = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
    };

    const dialogClasses = cn(
      'relative bg-tv-compose-surface-container rounded-tv-lg shadow-tv-modal',
      'flex flex-col max-h-[90vh]',
      {
        // Variant-specific styling
        'w-full h-full max-w-none max-h-none rounded-none': variant === 'full-screen',
        [sizeConfig[size]]: variant === 'basic',
      },
      className
    );

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-tv-compose-black opacity-60"
          onClick={onClose}
        />
        
        {/* Dialog */}
        <div
          ref={ref}
          className={dialogClasses}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'dialog-title' : undefined}
          aria-describedby={description ? 'dialog-description' : undefined}
          {...props}
        >
          {/* Header */}
          {title && (
            <DialogHeader onClose={onClose} showCloseButton={showCloseButton}>
              {title}
            </DialogHeader>
          )}

          {/* Content */}
          <DialogContent>
            {description && (
              <Text 
                id="dialog-description"
                variant="body-large" 
                color="on-surface"
                className="mb-4"
              >
                {description}
              </Text>
            )}
            {children}
          </DialogContent>
        </div>
      </div>
    );
  }
);

Dialog.displayName = 'Dialog';

// Dialog Header Component
export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, onClose, showCloseButton = true, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-between p-6 border-b border-tv-compose-outline',
        className
      )}
      {...props}
    >
      <Text 
        id="dialog-title"
        variant="title-large" 
        color="on-surface"
        className="flex-1 pr-4"
      >
        {children}
      </Text>
      
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className={cn(
            'p-2 rounded-tv-sm',
            'text-tv-compose-on-surface opacity-70 hover:opacity-100',
            'hover:bg-tv-compose-surface-variant',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-tv-compose-primary-40'
          )}
          aria-label="Close dialog"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
);
DialogHeader.displayName = 'DialogHeader';

// Dialog Content Component
export const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-1 p-6 overflow-auto', className)}
      {...props}
    >
      {children}
    </div>
  )
);
DialogContent.displayName = 'DialogContent';

// Dialog Actions Component
export const DialogActions = React.forwardRef<HTMLDivElement, DialogActionsProps>(
  ({ 
    children, 
    arrangement = 'horizontal',
    alignment = 'end',
    className, 
    ...props 
  }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex gap-3 p-6 pt-0',
        {
          'flex-row': arrangement === 'horizontal',
          'flex-col': arrangement === 'vertical',
          'justify-start': alignment === 'start',
          'justify-center': alignment === 'center',
          'justify-end': alignment === 'end',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
DialogActions.displayName = 'DialogActions';

// Convenience component for common dialog actions
export const createDialogActions = (
  actions: DialogActionProps[],
  arrangement: 'horizontal' | 'vertical' = 'horizontal'
) => {
  return (
    <DialogActions arrangement={arrangement}>
      {actions.map((action, index) => (
        <Button
          key={index}
          variant={action.variant || 'outline'}
          onClick={action.onClick}
          disabled={action.disabled}
          size="md"
          className={action.autoFocus ? 'ring-2 ring-tv-compose-primary-40' : undefined}
        >
          {action.label}
        </Button>
      ))}
    </DialogActions>
  );
};

// Pre-built confirmation dialog
export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'destructive' | 'default';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} title={title} description={description} size="sm">
      <DialogActions>
        <Button variant="ghost" onClick={onClose}>
          {cancelLabel}
        </Button>
        <Button 
          variant={variant === 'destructive' ? 'filled' : 'filled'}
          onClick={handleConfirm}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 