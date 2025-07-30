import React from 'react';
import { cn } from '../../utils/cn';
import { useFocus } from '../../hooks/useFocus';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'wide-standard' | 'wide-classic' | 'compact' | 'classic' | 'standard';
  state?: 'default' | 'focused' | 'inactive';
  hoverable?: boolean;
  focusable?: boolean;
  className?: string;
  onClick?: () => void;
}

export interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  aspectRatio?: 'video' | 'square' | 'portrait';
  children?: React.ReactNode;
  className?: string;
}

export interface CardTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface CardHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface CardSubtitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export interface CardTagProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    children, 
    variant = 'standard',
    state = 'default',
    hoverable = false, 
    focusable = false, 
    onClick, 
    ...props 
  }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLDivElement>();

    // Combine the forwarded ref with our focus ref
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

    // Layout classes based on variant
    const layoutClasses = cn({
      // Wide variants - horizontal layout
      'flex flex-row items-center': variant === 'wide-standard' || variant === 'wide-classic',
      // Other variants - vertical or compact layouts  
      'flex flex-col': variant === 'classic' || variant === 'standard',
      'inline-flex flex-col': variant === 'compact',
    });

    // Size classes based on variant
    const sizeClasses = cn({
      'w-[412px] h-[110px]': variant === 'wide-standard' || variant === 'wide-classic',
      'w-[280px] h-[400px]': variant === 'classic',
      'w-[196px] h-[280px]': variant === 'standard',
      'w-[160px] h-[220px]': variant === 'compact',
    });

    // State classes
    const stateClasses = cn({
      'opacity-60': state === 'inactive',
      'opacity-100': state === 'default',
    });

    // Focus effects (matching Figma specifications)
    const focusClasses = cn({
      // Default focus styles
      'focus:outline-none': focusable || onClick,
      // TV Compose focus state (when focused or state is focused)
      'border-2 border-tv-compose-neutral-variant-60 shadow-tv-modal scale-105': 
        (isFocused && (focusable || onClick)) || state === 'focused',
    });

    return (
      <Component
        ref={focusRef}
        className={cn(
          // Base card styles using TV Compose tokens
          'bg-tv-compose-neutral-10 rounded-tv-lg overflow-hidden',
          'transition-all duration-200 ease-out',
          // Layout
          layoutClasses,
          // Size
          sizeClasses,
          // State
          stateClasses,
          // Focus
          focusClasses,
          // Interactive
          {
            'cursor-pointer': hoverable || onClick,
          },
          className
        )}
        {...interactiveProps}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

// Card Image Component
export const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, src, alt, aspectRatio = 'video', children, ...props }, ref) => {
    
    const aspectClasses = cn({
      'aspect-video': aspectRatio === 'video', // 16:9
      'aspect-square': aspectRatio === 'square', // 1:1
      'aspect-[3/4]': aspectRatio === 'portrait', // 3:4
    });

    return (
      <div
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-tv-md bg-tv-compose-neutral-20',
          'flex items-center justify-center',
          aspectClasses,
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || ''}
            className="w-full h-full object-cover"
          />
        ) : null}
        {children}
      </div>
    );
  }
);
CardImage.displayName = 'CardImage';

// Card Text Section
export const CardText = React.forwardRef<HTMLDivElement, CardTextProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-start gap-2 p-3',
        'flex-1', // Take remaining space in layout
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardText.displayName = 'CardText';

// Card Heading (contains title and subtitle)
export const CardHeading = React.forwardRef<HTMLDivElement, CardHeadingProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-start gap-0 flex-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeading.displayName = 'CardHeading';

// Card Title
export const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'text-tv-title-medium text-tv-compose-on-surface',
        'line-clamp-1 self-stretch',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardTitle.displayName = 'CardTitle';

// Card Subtitle
export const CardSubtitle = React.forwardRef<HTMLDivElement, CardSubtitleProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'text-tv-body-small text-tv-compose-on-surface opacity-60',
        'line-clamp-1 self-stretch',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardSubtitle.displayName = 'CardSubtitle';

// Card Description
export const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'text-tv-body-small text-tv-compose-on-surface opacity-80',
        'line-clamp-3 self-stretch',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardDescription.displayName = 'CardDescription';

// Card Tag
export const CardTag = React.forwardRef<HTMLDivElement, CardTagProps>(
  ({ className, children, icon, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-1 px-2 py-0.5',
        'bg-tv-compose-surface-variant rounded-tv-md',
        'text-tv-label-small text-tv-compose-neutral-variant-80',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="w-2.5 h-2.5 flex items-center justify-center">
          {icon}
        </div>
      )}
      {children}
    </div>
  )
);
CardTag.displayName = 'CardTag';

// Legacy components for backward compatibility
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-4 py-3 border-b border-tv-compose-neutral-20',
      className
    )}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-4 py-3 border-t border-tv-compose-neutral-20',
      className
    )}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter'; 