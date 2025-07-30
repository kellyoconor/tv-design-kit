import React from 'react';
import { cn } from '../../utils/cn';
import { useFocus } from '../../hooks/useFocus';
import { Text } from '../Text/Text';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  variant?: 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'error' | 'success' | 'disabled';
  maxLength?: number;
  showCharacterCount?: boolean;
  className?: string;
}

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  helperText?: string;
  errorText?: string;
  variant?: 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  state?: 'default' | 'error' | 'success' | 'disabled';
  maxLength?: number;
  showCharacterCount?: boolean;
  className?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({
    label,
    helperText,
    errorText,
    leadingIcon,
    trailingIcon,
    variant = 'outlined',
    size = 'md',
    state = 'default',
    maxLength,
    showCharacterCount = false,
    className,
    value,
    onChange,
    ...props
  }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLInputElement>();
    const [internalValue, setInternalValue] = React.useState(value || '');

    // Combine refs
    React.useImperativeHandle(ref, () => focusRef.current!, []);

    const currentValue = value !== undefined ? value : internalValue;
    const characterCount = String(currentValue).length;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (maxLength && newValue.length > maxLength) return;
      
      if (value === undefined) {
        setInternalValue(newValue);
      }
      
      if (onChange) {
        onChange(e as any);
      }
    };

    // Determine current state
    const currentState = props.disabled ? 'disabled' : (errorText ? 'error' : state);

    // Size configurations
    const sizeConfig = {
      sm: {
        inputPadding: 'px-3 py-2',
        iconSize: 'w-4 h-4',
        textVariant: 'body-small' as const,
        labelVariant: 'label-medium' as const,
      },
      md: {
        inputPadding: 'px-4 py-3',
        iconSize: 'w-5 h-5',
        textVariant: 'body-medium' as const,
        labelVariant: 'label-large' as const,
      },
      lg: {
        inputPadding: 'px-4 py-4',
        iconSize: 'w-6 h-6',
        textVariant: 'body-large' as const,
        labelVariant: 'title-small' as const,
      },
    };

    const config = sizeConfig[size];

    // Container classes
    const containerClasses = cn(
      'relative transition-all duration-200',
      {
        // Variant-specific container styles
        'bg-tv-compose-surface-variant rounded-tv-sm': variant === 'filled',
        'border rounded-tv-sm': variant === 'outlined',
        
        // State-specific border colors for outlined variant
        'border-tv-compose-outline': variant === 'outlined' && currentState === 'default',
        'border-tv-compose-primary-40': variant === 'outlined' && isFocused && currentState === 'default',
        'border-tv-compose-error-40': variant === 'outlined' && currentState === 'error',
        'border-tv-compose-tertiary-40': variant === 'outlined' && currentState === 'success',
        'border-tv-compose-outline opacity-50': variant === 'outlined' && currentState === 'disabled',

        // Focus ring for filled variant
        'ring-2 ring-tv-compose-primary-40': variant === 'filled' && isFocused && currentState !== 'error',
        'ring-2 ring-tv-compose-error-40': variant === 'filled' && currentState === 'error',
      }
    );

    // Input classes
    const inputClasses = cn(
      'w-full bg-transparent transition-colors duration-200',
      'focus:outline-none',
      'text-tv-compose-on-surface placeholder:text-tv-compose-on-surface placeholder:opacity-60',
      config.inputPadding,
      config.textVariant,
      {
        // Icon padding adjustments
        'pl-10': leadingIcon && size === 'sm',
        'pl-12': leadingIcon && size === 'md',
        'pl-14': leadingIcon && size === 'lg',
        'pr-10': trailingIcon && size === 'sm',
        'pr-12': trailingIcon && size === 'md',
        'pr-14': trailingIcon && size === 'lg',
        
        // Disabled state
        'opacity-50 cursor-not-allowed': currentState === 'disabled',
      }
    );

         const inputProps = { type: 'text', ...props };

    return (
      <div className={cn('space-y-1', className)}>
        {/* Label */}
        {label && (
          <Text 
            variant={config.labelVariant}
            color="on-surface"
            className={cn(
              'block',
              {
                'opacity-50': currentState === 'disabled',
                'text-tv-compose-error-40': currentState === 'error',
                'text-tv-compose-tertiary-40': currentState === 'success',
              }
            )}
          >
            {label}
          </Text>
        )}

        {/* Input Container */}
        <div className={containerClasses}>
          {/* Leading Icon */}
          {leadingIcon && (
            <div className={cn(
              'absolute left-3 top-1/2 transform -translate-y-1/2',
              'flex items-center justify-center',
              config.iconSize,
              {
                'text-tv-compose-on-surface opacity-60': currentState === 'default',
                'text-tv-compose-primary-40': isFocused && currentState === 'default',
                'text-tv-compose-error-40': currentState === 'error',
                'text-tv-compose-tertiary-40': currentState === 'success',
                'opacity-30': currentState === 'disabled',
              }
            )}>
              {leadingIcon}
            </div>
          )}

                     {/* Input */}
           <input
             ref={focusRef}
             value={currentValue}
             onChange={handleChange}
             disabled={currentState === 'disabled'}
             maxLength={maxLength}
             className={inputClasses}
             {...focusProps}
             {...inputProps}
           />

          {/* Trailing Icon */}
          {trailingIcon && (
            <div className={cn(
              'absolute right-3 top-1/2 transform -translate-y-1/2',
              'flex items-center justify-center',
              config.iconSize,
              {
                'text-tv-compose-on-surface opacity-60': currentState === 'default',
                'text-tv-compose-primary-40': isFocused && currentState === 'default',
                'text-tv-compose-error-40': currentState === 'error',
                'text-tv-compose-tertiary-40': currentState === 'success',
                'opacity-30': currentState === 'disabled',
              }
            )}>
              {trailingIcon}
            </div>
          )}
        </div>

        {/* Helper/Error Text and Character Count */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            {errorText && (
              <Text 
                variant="body-small" 
                className="text-tv-compose-error-40"
              >
                {errorText}
              </Text>
            )}
            {helperText && !errorText && (
              <Text 
                variant="body-small" 
                color="on-surface"
                className="opacity-70"
              >
                {helperText}
              </Text>
            )}
          </div>
          
          {showCharacterCount && maxLength && (
            <Text 
              variant="body-small" 
              color="on-surface"
              className={cn(
                'opacity-70 flex-shrink-0',
                {
                  'text-tv-compose-error-40': characterCount > maxLength * 0.9,
                }
              )}
            >
              {characterCount}/{maxLength}
            </Text>
          )}
        </div>
      </div>
    );
  }
);

TextField.displayName = 'TextField';

// Dedicated TextArea component 
export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({
    label,
    helperText,
    errorText,
    variant = 'outlined',
    size = 'md',
    state = 'default',
    maxLength,
    showCharacterCount = false,
    className,
    value,
    onChange,
    rows = 3,
    ...props
  }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLTextAreaElement>();
    const [internalValue, setInternalValue] = React.useState(value || '');

    // Combine refs
    React.useImperativeHandle(ref, () => focusRef.current!, []);

    const currentValue = value !== undefined ? value : internalValue;
    const characterCount = String(currentValue).length;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (maxLength && newValue.length > maxLength) return;
      
      if (value === undefined) {
        setInternalValue(newValue);
      }
      
      if (onChange) {
        onChange(e);
      }
    };

    // Determine current state
    const currentState = props.disabled ? 'disabled' : (errorText ? 'error' : state);

    // Size configurations
    const sizeConfig = {
      sm: {
        inputPadding: 'px-3 py-2',
        textVariant: 'body-small' as const,
        labelVariant: 'label-medium' as const,
      },
      md: {
        inputPadding: 'px-4 py-3',
        textVariant: 'body-medium' as const,
        labelVariant: 'label-large' as const,
      },
      lg: {
        inputPadding: 'px-4 py-4',
        textVariant: 'body-large' as const,
        labelVariant: 'title-small' as const,
      },
    };

    const config = sizeConfig[size];

    // Container classes
    const containerClasses = cn(
      'relative transition-all duration-200',
      {
        // Variant-specific container styles
        'bg-tv-compose-surface-variant rounded-tv-sm': variant === 'filled',
        'border rounded-tv-sm': variant === 'outlined',
        
        // State-specific border colors for outlined variant
        'border-tv-compose-outline': variant === 'outlined' && currentState === 'default',
        'border-tv-compose-primary-40': variant === 'outlined' && isFocused && currentState === 'default',
        'border-tv-compose-error-40': variant === 'outlined' && currentState === 'error',
        'border-tv-compose-tertiary-40': variant === 'outlined' && currentState === 'success',
        'border-tv-compose-outline opacity-50': variant === 'outlined' && currentState === 'disabled',

        // Focus ring for filled variant
        'ring-2 ring-tv-compose-primary-40': variant === 'filled' && isFocused && currentState !== 'error',
        'ring-2 ring-tv-compose-error-40': variant === 'filled' && currentState === 'error',
      }
    );

    // Input classes
    const inputClasses = cn(
      'w-full bg-transparent transition-colors duration-200 resize-none',
      'focus:outline-none',
      'text-tv-compose-on-surface placeholder:text-tv-compose-on-surface placeholder:opacity-60',
      config.inputPadding,
      config.textVariant,
      {
        // Disabled state
        'opacity-50 cursor-not-allowed': currentState === 'disabled',
      }
    );

    return (
      <div className={cn('space-y-1', className)}>
        {/* Label */}
        {label && (
          <Text 
            variant={config.labelVariant}
            color="on-surface"
            className={cn(
              'block',
              {
                'opacity-50': currentState === 'disabled',
                'text-tv-compose-error-40': currentState === 'error',
                'text-tv-compose-tertiary-40': currentState === 'success',
              }
            )}
          >
            {label}
          </Text>
        )}

        {/* TextArea Container */}
        <div className={containerClasses}>
          <textarea
            ref={focusRef}
            value={currentValue}
            onChange={handleChange}
            disabled={currentState === 'disabled'}
            maxLength={maxLength}
            rows={rows}
            className={inputClasses}
            {...focusProps}
            {...props}
          />
        </div>

        {/* Helper/Error Text and Character Count */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            {errorText && (
              <Text 
                variant="body-small" 
                className="text-tv-compose-error-40"
              >
                {errorText}
              </Text>
            )}
            {helperText && !errorText && (
              <Text 
                variant="body-small" 
                color="on-surface"
                className="opacity-70"
              >
                {helperText}
              </Text>
            )}
          </div>
          
          {showCharacterCount && maxLength && (
            <Text 
              variant="body-small" 
              color="on-surface"
              className={cn(
                'opacity-70 flex-shrink-0',
                {
                  'text-tv-compose-error-40': characterCount > maxLength * 0.9,
                }
              )}
            >
              {characterCount}/{maxLength}
            </Text>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea'; 