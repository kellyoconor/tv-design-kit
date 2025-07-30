import React from 'react';
import { cn } from '../../utils/cn';
import { useFocus } from '../../hooks/useFocus';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline' | 'ghost' | 'image';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  backgroundImage?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'filled', 
    size = 'md', 
    icon,
    subtitle,
    backgroundImage,
    children, 
    ...props 
  }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLButtonElement>();

    // Combine the forwarded ref with our focus ref
    React.useImperativeHandle(ref, () => focusRef.current!, []);

    // Size configurations based on Figma specs
    const sizeConfig = {
      sm: {
        height: 'h-12', // 48px
        padding: 'px-4 py-3', // 12px vertical, 16px horizontal
        iconSize: 'w-5 h-5', // 20px
        textContainer: subtitle ? 'h-6' : 'h-6', // 24px for single line
      },
      md: {
        height: 'h-12', // 48px (same as sm for most buttons)
        padding: 'px-4 py-3',
        iconSize: 'w-5 h-5',
        textContainer: subtitle ? 'h-6' : 'h-6',
      },
      lg: {
        height: 'h-16', // 64px
        padding: subtitle ? 'px-4 py-3 pr-8' : 'px-4 py-3', // Extra right padding when subtitle
        iconSize: 'w-5 h-5',
        textContainer: subtitle ? 'h-10' : 'h-6', // 40px when subtitle, 24px single
      },
    };

    const config = sizeConfig[size];

    // Base button classes
    const baseClasses = cn(
      // Layout and positioning
      'relative inline-flex items-center gap-3 overflow-hidden',
      'font-roboto transition-all duration-200 ease-out',
      'focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
      
      // Size-specific classes
      config.height,
      config.padding,
      
      // Border radius
      'rounded-tv-md',
      
      // Focus state transformations
      isFocused && [
        'scale-110 rounded-tv-md-focus',
        'shadow-tv-focus',
        'drop-shadow-tv-focus-drop',
        'z-50',
      ]
    );

    // Variant-specific styles
    const variantClasses = cn({
      // Filled button (primary)
      'bg-tv-compose-inverse-surface text-tv-compose-inverse-on-surface': variant === 'filled',
      
      // Outline button  
      'bg-transparent border-2 border-tv-compose-on-surface border-opacity-20 text-tv-compose-on-surface': variant === 'outline',
      
      // Ghost button
      'bg-tv-compose-surface-variant bg-opacity-40 text-tv-compose-on-surface': variant === 'ghost',
      
      // Image button (complex background with image)
      'bg-tv-compose-inverse-on-surface text-tv-compose-on-surface': variant === 'image',
    });

    // Render image background for image variant
    const renderImageBackground = () => {
      if (variant !== 'image' || !backgroundImage) return null;
      
      return (
        <div className="absolute inset-0 flex justify-end items-center overflow-hidden rounded-tv-md">
          {/* Background Image */}
          <div 
            className="w-40 h-full opacity-80 bg-cover bg-center flex-none"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-tv-compose-surface via-tv-compose-surface to-transparent"
            style={{ 
              background: 'linear-gradient(90deg, #1D1D1E 40%, rgba(29, 29, 30, 0) 100%)'
            }}
          />
          
          {/* Scrim */}
          <div className="absolute inset-0 bg-tv-compose-surface-variant opacity-20" />
        </div>
      );
    };

    return (
      <button
        className={cn(baseClasses, variantClasses, className)}
        ref={focusRef}
        {...focusProps}
        {...props}
      >
        {/* Image background for image variant */}
        {renderImageBackground()}
        
        {/* Button content */}
        <div className="relative z-10 flex items-center gap-3 w-full">
          {/* Icon */}
          {icon && (
            <div className={cn(
              config.iconSize,
              'flex-shrink-0 flex items-center justify-center',
              isFocused && size === 'lg' && 'w-5.5 h-5.5' // 22px when focused on large
            )}>
              {icon}
            </div>
          )}
          
          {/* Text Content */}
          <div className={cn(
            'flex flex-col justify-center items-start flex-grow',
            config.textContainer
          )}>
            {/* Title */}
            <div className={cn(
              'text-tv-title-medium leading-6',
              'w-full truncate',
              !subtitle && 'self-stretch'
            )}>
              {children}
            </div>
            
            {/* Subtitle */}
            {subtitle && (
              <div className="text-tv-body-small leading-4 opacity-80 w-full truncate">
                {subtitle}
              </div>
            )}
          </div>
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button'; 