import React from 'react';
import { cn } from '../../utils/cn';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 
    | 'display-large' | 'display-medium' | 'display-small'
    | 'headline-large' | 'headline-medium' | 'headline-small'
    | 'title-large' | 'title-medium' | 'title-small'
    | 'label-large' | 'label-medium' | 'label-small'
    | 'body-large' | 'body-medium' | 'body-small';
  color?: 'on-surface' | 'on-surface-variant' | 'inverse-surface' | 'inverse-on-surface' | 'primary' | 'secondary' | 'tertiary' | 'error' | 'white' | 'black';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  opacity?: number;
  children: React.ReactNode;
  className?: string;
}

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({
    as: Component = 'p',
    variant = 'body-medium',
    color = 'on-surface',
    align = 'left',
    weight,
    opacity,
    className,
    children,
    ...props
  }, ref) => {
    
    // Default component mapping based on variant
    const getDefaultComponent = () => {
      if (Component !== 'p') return Component; // Use explicitly set component
      
      switch (variant) {
        case 'display-large':
        case 'display-medium':
        case 'display-small':
          return 'h1';
        case 'headline-large':
          return 'h2';
        case 'headline-medium':
          return 'h3';
        case 'headline-small':
          return 'h4';
        case 'title-large':
          return 'h5';
        case 'title-medium':
        case 'title-small':
          return 'h6';
        case 'label-large':
        case 'label-medium':
        case 'label-small':
          return 'span';
        default:
          return 'p';
      }
    };

    const FinalComponent = getDefaultComponent();

    return (
      <FinalComponent
        ref={ref as any}
        className={cn(
          'font-roboto',
          
          // TV Compose Typography Variants (exact from Figma)
          {
            // Display
            'text-tv-display-large': variant === 'display-large',
            'text-tv-display-medium': variant === 'display-medium',
            'text-tv-display-small': variant === 'display-small',
            
            // Headline
            'text-tv-headline-large': variant === 'headline-large',
            'text-tv-headline-medium': variant === 'headline-medium',
            'text-tv-headline-small': variant === 'headline-small',
            
            // Title
            'text-tv-title-large': variant === 'title-large',
            'text-tv-title-medium': variant === 'title-medium',
            'text-tv-title-small': variant === 'title-small',
            
            // Label
            'text-tv-label-large': variant === 'label-large',
            'text-tv-label-medium': variant === 'label-medium',
            'text-tv-label-small': variant === 'label-small',
            
            // Body
            'text-tv-body-large': variant === 'body-large',
            'text-tv-body-medium': variant === 'body-medium',
            'text-tv-body-small': variant === 'body-small',
          },
          
          // TV Compose Colors (exact from Figma)
          {
            'text-tv-compose-on-surface': color === 'on-surface',
            'text-tv-compose-on-surface-variant': color === 'on-surface-variant',
            'text-tv-compose-inverse-surface': color === 'inverse-surface',
            'text-tv-compose-inverse-on-surface': color === 'inverse-on-surface',
            'text-tv-compose-primary-40': color === 'primary',
            'text-tv-compose-secondary-40': color === 'secondary',
            'text-tv-compose-tertiary-40': color === 'tertiary',
            'text-tv-compose-error-40': color === 'error',
            'text-tv-compose-white': color === 'white',
            'text-tv-compose-black': color === 'black',
          },
          
          // Weight override (if provided)
          weight && {
            'font-normal': weight === 'normal',
            'font-medium': weight === 'medium',
            'font-semibold': weight === 'semibold',
            'font-bold': weight === 'bold',
          },
          
          // Alignment
          {
            'text-left': align === 'left',
            'text-center': align === 'center',
            'text-right': align === 'right',
          },
          
          className
        )}
        style={{
          ...(opacity !== undefined && { opacity }),
          ...props.style,
        }}
        {...props}
      >
        {children}
      </FinalComponent>
    );
  }
);

Text.displayName = 'Text'; 