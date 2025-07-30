import React from 'react';
import { cn } from '../../utils/cn';
import { useFocus } from '../../hooks/useFocus';
import { Text } from '../Text/Text';

// Radio Button Component
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  className?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, size = 'md', error = false, className, ...props }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLInputElement>();

    // Combine refs
    React.useImperativeHandle(ref, () => focusRef.current!, []);

    const sizeConfig = {
      sm: {
        radioSize: 'w-4 h-4',
        textVariant: 'body-small' as const,
        labelVariant: 'label-medium' as const,
      },
      md: {
        radioSize: 'w-5 h-5',
        textVariant: 'body-medium' as const,
        labelVariant: 'label-large' as const,
      },
      lg: {
        radioSize: 'w-6 h-6',
        textVariant: 'body-large' as const,
        labelVariant: 'title-small' as const,
      },
    };

    const config = sizeConfig[size];

    return (
      <label className={cn('flex items-start gap-3 cursor-pointer', className)}>
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            ref={focusRef}
            type="radio"
            className="sr-only"
            {...focusProps}
            {...props}
          />
          
          {/* Custom Radio Button */}
          <div className={cn(
            'border-2 rounded-full transition-all duration-200 flex items-center justify-center',
            config.radioSize,
            {
              // Default state
              'border-tv-compose-outline bg-transparent': !props.checked && !error,
              
              // Checked state
              'border-tv-compose-primary-40 bg-tv-compose-primary-40': props.checked && !error,
              
              // Error state
              'border-tv-compose-error-40': error && !props.checked,
              'border-tv-compose-error-40 bg-tv-compose-error-40': error && props.checked,
              
              // Disabled state
              'opacity-50 cursor-not-allowed': props.disabled,
              
              // Focus state
              'ring-2 ring-tv-compose-primary-40 ring-offset-2 ring-offset-tv-compose-surface': 
                isFocused && !props.disabled,
              'scale-110': isFocused && !props.disabled,
            }
          )}>
            {/* Inner dot */}
            {props.checked && (
              <div className={cn(
                'rounded-full bg-tv-compose-white',
                size === 'sm' ? 'w-1.5 h-1.5' : size === 'md' ? 'w-2 h-2' : 'w-2.5 h-2.5'
              )} />
            )}
          </div>
        </div>

        {/* Label and Description */}
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <Text 
                variant={config.labelVariant}
                color="on-surface"
                className={cn(
                  'block',
                  {
                    'opacity-50': props.disabled,
                    'text-tv-compose-error-40': error,
                  }
                )}
              >
                {label}
              </Text>
            )}
            {description && (
              <Text 
                variant={config.textVariant}
                color="on-surface"
                className={cn(
                  'opacity-70 mt-1',
                  {
                    'opacity-30': props.disabled,
                  }
                )}
              >
                {description}
              </Text>
            )}
          </div>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

// Switch Component
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  error?: boolean;
  className?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, size = 'md', icon, error = false, className, ...props }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLInputElement>();

    // Combine refs
    React.useImperativeHandle(ref, () => focusRef.current!, []);

    const sizeConfig = {
      sm: {
        trackWidth: 'w-8',
        trackHeight: 'h-4',
        thumbSize: 'w-3 h-3',
        thumbTransform: props.checked ? 'translate-x-4' : 'translate-x-0.5',
        textVariant: 'body-small' as const,
        labelVariant: 'label-medium' as const,
        iconSize: 'w-3 h-3',
      },
      md: {
        trackWidth: 'w-11',
        trackHeight: 'h-6',
        thumbSize: 'w-5 h-5',
        thumbTransform: props.checked ? 'translate-x-5' : 'translate-x-0.5',
        textVariant: 'body-medium' as const,
        labelVariant: 'label-large' as const,
        iconSize: 'w-4 h-4',
      },
      lg: {
        trackWidth: 'w-14',
        trackHeight: 'h-8',
        thumbSize: 'w-7 h-7',
        thumbTransform: props.checked ? 'translate-x-6' : 'translate-x-0.5',
        textVariant: 'body-large' as const,
        labelVariant: 'title-small' as const,
        iconSize: 'w-5 h-5',
      },
    };

    const config = sizeConfig[size];

    return (
      <label className={cn('flex items-start gap-3 cursor-pointer', className)}>
        <div className="relative flex-shrink-0 mt-1">
          <input
            ref={focusRef}
            type="checkbox"
            className="sr-only"
            {...focusProps}
            {...props}
          />
          
          {/* Switch Track */}
          <div className={cn(
            'rounded-full transition-all duration-200 relative',
            config.trackWidth,
            config.trackHeight,
            {
              // Default state
              'bg-tv-compose-outline': !props.checked && !error,
              
              // Checked state
              'bg-tv-compose-primary-40': props.checked && !error,
              
              // Error state
              'bg-tv-compose-error-40': error,
              
              // Disabled state
              'opacity-50 cursor-not-allowed': props.disabled,
              
              // Focus state
              'ring-2 ring-tv-compose-primary-40 ring-offset-2 ring-offset-tv-compose-surface': 
                isFocused && !props.disabled,
              'scale-110': isFocused && !props.disabled,
            }
          )}>
            {/* Switch Thumb */}
            <div className={cn(
              'absolute top-0.5 bg-tv-compose-white rounded-full transition-transform duration-200 flex items-center justify-center',
              config.thumbSize,
              config.thumbTransform
            )}>
              {/* Icon */}
              {icon && (
                <div className={cn(config.iconSize, 'text-tv-compose-on-surface')}>
                  {icon}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Label and Description */}
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <Text 
                variant={config.labelVariant}
                color="on-surface"
                className={cn(
                  'block',
                  {
                    'opacity-50': props.disabled,
                    'text-tv-compose-error-40': error,
                  }
                )}
              >
                {label}
              </Text>
            )}
            {description && (
              <Text 
                variant={config.textVariant}
                color="on-surface"
                className={cn(
                  'opacity-70 mt-1',
                  {
                    'opacity-30': props.disabled,
                  }
                )}
              >
                {description}
              </Text>
            )}
          </div>
        )}
      </label>
    );
  }
);

Switch.displayName = 'Switch';

// Checkbox Component
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
  error?: boolean;
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, size = 'md', indeterminate = false, error = false, className, ...props }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLInputElement>();

    // Combine refs
    React.useImperativeHandle(ref, () => focusRef.current!, []);

    React.useEffect(() => {
      if (focusRef.current) {
        focusRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const sizeConfig = {
      sm: {
        checkboxSize: 'w-4 h-4',
        textVariant: 'body-small' as const,
        labelVariant: 'label-medium' as const,
        iconSize: 'w-3 h-3',
      },
      md: {
        checkboxSize: 'w-5 h-5',
        textVariant: 'body-medium' as const,
        labelVariant: 'label-large' as const,
        iconSize: 'w-4 h-4',
      },
      lg: {
        checkboxSize: 'w-6 h-6',
        textVariant: 'body-large' as const,
        labelVariant: 'title-small' as const,
        iconSize: 'w-5 h-5',
      },
    };

    const config = sizeConfig[size];

    return (
      <label className={cn('flex items-start gap-3 cursor-pointer', className)}>
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            ref={focusRef}
            type="checkbox"
            className="sr-only"
            {...focusProps}
            {...props}
          />
          
          {/* Custom Checkbox */}
          <div className={cn(
            'border-2 rounded-tv-sm transition-all duration-200 flex items-center justify-center',
            config.checkboxSize,
            {
              // Default state
              'border-tv-compose-outline bg-transparent': !props.checked && !indeterminate && !error,
              
              // Checked state
              'border-tv-compose-primary-40 bg-tv-compose-primary-40': (props.checked || indeterminate) && !error,
              
              // Error state
              'border-tv-compose-error-40': error && !props.checked && !indeterminate,
              'border-tv-compose-error-40 bg-tv-compose-error-40': error && (props.checked || indeterminate),
              
              // Disabled state
              'opacity-50 cursor-not-allowed': props.disabled,
              
              // Focus state
              'ring-2 ring-tv-compose-primary-40 ring-offset-2 ring-offset-tv-compose-surface': 
                isFocused && !props.disabled,
              'scale-110': isFocused && !props.disabled,
            }
          )}>
            {/* Checkmark or Indeterminate Icon */}
            {(props.checked || indeterminate) && (
              <div className={cn(config.iconSize, 'text-tv-compose-white')}>
                {indeterminate ? (
                  // Indeterminate dash
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4 8h8v1H4z" />
                  </svg>
                ) : (
                  // Checkmark
                  <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.485 3.429a.75.75 0 0 1 .086 1.056l-7 8.5a.75.75 0 0 1-1.142 0l-3.5-4.25a.75.75 0 0 1 1.142-.94L6.5 11.44l6.429-7.811a.75.75 0 0 1 1.056-.086z" />
                  </svg>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Label and Description */}
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <Text 
                variant={config.labelVariant}
                color="on-surface"
                className={cn(
                  'block',
                  {
                    'opacity-50': props.disabled,
                    'text-tv-compose-error-40': error,
                  }
                )}
              >
                {label}
              </Text>
            )}
            {description && (
              <Text 
                variant={config.textVariant}
                color="on-surface"
                className={cn(
                  'opacity-70 mt-1',
                  {
                    'opacity-30': props.disabled,
                  }
                )}
              >
                {description}
              </Text>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// Radio Group Component for TV navigation
export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  children,
  orientation = 'vertical',
  gap = 'md',
  className,
}) => {
  const gapClasses = {
    'sm': 'gap-2',
    'md': 'gap-4',
    'lg': 'gap-6',
  };

  return (
    <div
      className={cn(
        'flex',
        {
          'flex-col': orientation === 'vertical',
          'flex-row flex-wrap': orientation === 'horizontal',
        },
        gapClasses[gap],
        className
      )}
      role="radiogroup"
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Radio) {
          return React.cloneElement(child as React.ReactElement<RadioProps>, {
            name,
            checked: child.props.value === value,
            onChange: onChange ? () => onChange(child.props.value as string) : child.props.onChange,
          });
        }
        return child;
      })}
    </div>
  );
}; 