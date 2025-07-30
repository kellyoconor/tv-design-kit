import React from 'react';
import { cn } from '../../utils/cn';
import { useFocus } from '../../hooks/useFocus';
import { Text } from '../Text/Text';

export interface PosterProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'card' | 'minimal';
  focusable?: boolean;
  showOverlay?: boolean;
  badge?: string;
  rating?: string;
  onClick?: () => void;
  className?: string;
}

export const Poster = React.forwardRef<HTMLDivElement, PosterProps>(
  ({
    src,
    alt,
    title,
    subtitle,
    aspectRatio = 'portrait',
    size = 'md',
    variant = 'default',
    focusable = true,
    showOverlay = true,
    badge,
    rating,
    onClick,
    className,
    ...props
  }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLDivElement>();

    // Combine the forwarded ref with our focus ref
    React.useImperativeHandle(ref, () => focusRef.current!, []);

    const interactiveProps = focusable || onClick ? {
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

    // Size configurations
    const sizeConfig = {
      sm: {
        width: 'w-24',
        textClass: 'text-tv-body-small',
        titleClass: 'text-tv-label-medium',
      },
      md: {
        width: 'w-32',
        textClass: 'text-tv-body-small',
        titleClass: 'text-tv-label-large',
      },
      lg: {
        width: 'w-40',
        textClass: 'text-tv-body-medium',
        titleClass: 'text-tv-title-small',
      },
      xl: {
        width: 'w-48',
        textClass: 'text-tv-body-medium', 
        titleClass: 'text-tv-title-medium',
      },
    };

    const config = sizeConfig[size];

    return (
      <div
        ref={focusRef}
        className={cn(
          'group relative transition-all duration-200 ease-out',
          config.width,
          {
            // Interactive states
            'cursor-pointer': focusable || onClick,
            // TV Compose focus state
            'scale-110 shadow-tv-modal': isFocused && (focusable || onClick),
          },
          className
        )}
        {...interactiveProps}
        {...props}
      >
        <div
          className={cn(
            'relative overflow-hidden bg-tv-compose-neutral-20 rounded-tv-md',
            {
              'aspect-[2/3]': aspectRatio === 'portrait',
              'aspect-[16/9]': aspectRatio === 'landscape', 
              'aspect-square': aspectRatio === 'square',
            },
            {
              // Variant-specific styling
              'ring-2 ring-tv-compose-neutral-variant-50': variant === 'card',
              'shadow-tv-focus': variant === 'card',
            }
          )}
        >
          <img
            src={src}
            alt={alt}
            className={cn(
              'w-full h-full object-cover transition-transform duration-300',
              {
                'group-hover:scale-105': focusable || onClick,
                'scale-105': isFocused && (focusable || onClick),
              }
            )}
            loading="lazy"
          />
          
          {/* Badge */}
          {badge && (
            <div className="absolute top-2 left-2 z-10">
              <span className="px-2 py-1 bg-tv-compose-primary-40 text-tv-compose-white text-tv-label-small rounded-tv-sm">
                {badge}
              </span>
            </div>
          )}

          {/* Rating */}
          {rating && (
            <div className="absolute top-2 right-2 z-10">
              <span className="px-2 py-1 bg-tv-compose-black/60 text-tv-compose-white text-tv-label-small rounded-tv-sm backdrop-blur-sm">
                ★ {rating}
              </span>
            </div>
          )}
          
          {/* Hover/Focus overlay */}
          {showOverlay && (
            <div className={cn(
              'absolute inset-0 bg-gradient-to-t from-tv-compose-black/60 via-transparent to-transparent',
              'transition-opacity duration-300',
              {
                'opacity-0 group-hover:opacity-100': !isFocused,
                'opacity-100': isFocused && (focusable || onClick),
              }
            )} />
          )}
          
          {/* Focus ring */}
          {isFocused && (focusable || onClick) && (
            <div className="absolute inset-0 ring-2 ring-tv-compose-primary-40 rounded-tv-md" />
          )}
        </div>
        
        {/* Title and subtitle */}
        {(title || subtitle) && variant !== 'minimal' && (
          <div className="mt-2 space-y-1">
            {title && (
              <Text
                variant={config.titleClass === 'text-tv-label-medium' ? 'label-medium' : 
                        config.titleClass === 'text-tv-label-large' ? 'label-large' :
                        config.titleClass === 'text-tv-title-small' ? 'title-small' : 'title-medium'}
                color="on-surface"
                className={cn(
                  'line-clamp-2 transition-colors duration-200',
                  {
                    'group-hover:text-tv-compose-primary-40': focusable || onClick,
                  }
                )}
              >
                {title}
              </Text>
            )}
            {subtitle && (
              <Text
                variant="body-small"
                color="on-surface"
                opacity={0.7}
                className="line-clamp-1"
              >
                {subtitle}
              </Text>
            )}
          </div>
        )}
      </div>
    );
  }
);

Poster.displayName = 'Poster'; 