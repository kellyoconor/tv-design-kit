import React from 'react';
import { cn } from '../../utils/cn';
import { useFocus } from '../../hooks/useFocus';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';

export interface ContentBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imagePosition?: 'left' | 'right' | 'top' | 'bottom' | 'background';
  imageAspect?: 'square' | 'video' | 'portrait';
  variant?: 'default' | 'hero' | 'feature' | 'media';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  actions?: ContentBlockAction[];
  badge?: string;
  metadata?: ContentBlockMetadata[];
  focusable?: boolean;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export interface ContentBlockAction {
  label: string;
  variant?: 'filled' | 'outline' | 'ghost';
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface ContentBlockMetadata {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export const ContentBlock = React.forwardRef<HTMLDivElement, ContentBlockProps>(
  ({
    title,
    subtitle,
    description,
    image,
    imagePosition = 'top',
    imageAspect = 'video',
    variant = 'default',
    size = 'md',
    actions,
    badge,
    metadata,
    focusable = false,
    onClick,
    className,
    children,
    ...props
  }, ref) => {
    const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLDivElement>();

    // Combine refs
    React.useImperativeHandle(ref, () => focusRef.current!, []);

    const isInteractive = focusable && (onClick || actions?.some(action => action.onClick));

    // Size configurations
    const sizeConfig = {
      sm: {
        padding: 'p-4',
        gap: 'gap-3',
        titleVariant: 'title-small' as const,
        subtitleVariant: 'body-medium' as const,
        descriptionVariant: 'body-small' as const,
        maxWidth: 'max-w-sm',
      },
      md: {
        padding: 'p-6',
        gap: 'gap-4',
        titleVariant: 'title-medium' as const,
        subtitleVariant: 'body-large' as const,
        descriptionVariant: 'body-medium' as const,
        maxWidth: 'max-w-md',
      },
      lg: {
        padding: 'p-8',
        gap: 'gap-6',
        titleVariant: 'title-large' as const,
        subtitleVariant: 'title-small' as const,
        descriptionVariant: 'body-large' as const,
        maxWidth: 'max-w-lg',
      },
      xl: {
        padding: 'p-12',
        gap: 'gap-8',
        titleVariant: 'headline-small' as const,
        subtitleVariant: 'title-medium' as const,
        descriptionVariant: 'title-small' as const,
        maxWidth: 'max-w-xl',
      },
    };

    const config = sizeConfig[size];

    // Aspect ratio classes
    const aspectClasses = {
      'square': 'aspect-square',
      'video': 'aspect-video',
      'portrait': 'aspect-[3/4]',
    };

    // Layout classes based on image position
    const getLayoutClasses = () => {
      if (!image) return 'flex flex-col';
      
      switch (imagePosition) {
        case 'left':
          return 'flex flex-row';
        case 'right':
          return 'flex flex-row-reverse';
        case 'bottom':
          return 'flex flex-col-reverse';
        case 'background':
          return 'relative';
        default:
          return 'flex flex-col';
      }
    };

    // Variant-specific styling
    const getVariantClasses = () => {
      switch (variant) {
        case 'hero':
          return 'bg-gradient-to-r from-tv-compose-primary-10 to-tv-compose-secondary-10 text-tv-compose-on-surface';
        case 'feature':
          return 'bg-tv-compose-surface-container border border-tv-compose-outline text-tv-compose-on-surface';
        case 'media':
          return 'bg-tv-compose-neutral-10 text-tv-compose-on-surface';
        default:
          return 'bg-tv-compose-surface text-tv-compose-on-surface';
      }
    };

    const interactiveProps = isInteractive ? {
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

    const containerClasses = cn(
      'rounded-tv-lg overflow-hidden transition-all duration-200',
      getVariantClasses(),
      getLayoutClasses(),
      config.gap,
      {
        // Interactive states
        'cursor-pointer hover:shadow-tv-focus': isInteractive,
        'scale-[1.02] shadow-tv-modal': isFocused && isInteractive,
        
        // Size constraints for certain variants
        [config.maxWidth]: variant !== 'hero',
        'w-full': variant === 'hero',
      },
      className
    );

    // Background image styling
    const backgroundImageStyle = imagePosition === 'background' && image ? {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    } : {};

    return (
      <div
        ref={focusRef}
        className={containerClasses}
        style={backgroundImageStyle}
        {...interactiveProps}
        {...props}
      >
        {/* Background Overlay for background images */}
        {imagePosition === 'background' && image && (
          <div className="absolute inset-0 bg-gradient-to-t from-tv-compose-black to-transparent opacity-60" />
        )}

        {/* Image (when not background) */}
        {image && imagePosition !== 'background' && (
          <div className={cn(
            'flex-shrink-0',
            aspectClasses[imageAspect],
            {
              'w-1/2': imagePosition === 'left' || imagePosition === 'right',
              'w-full': imagePosition === 'top' || imagePosition === 'bottom',
            }
          )}>
            <img 
              src={image} 
              alt={title || ''} 
              className="w-full h-full object-cover rounded-tv-md"
            />
          </div>
        )}

        {/* Content Container */}
        <div className={cn(
          'flex flex-col',
          config.padding,
          config.gap,
          {
            'relative z-10': imagePosition === 'background',
            'flex-1': imagePosition === 'left' || imagePosition === 'right',
            'text-tv-compose-white': imagePosition === 'background',
          }
        )}>
          {/* Badge */}
          {badge && (
            <div className="inline-flex w-fit">
              <span className={cn(
                'px-3 py-1 rounded-tv-sm text-tv-label-small',
                'bg-tv-compose-primary-40 text-tv-compose-white'
              )}>
                {badge}
              </span>
            </div>
          )}

          {/* Title */}
          {title && (
            <Text 
              variant={config.titleVariant}
              className={cn(
                'font-medium',
                {
                  'text-tv-compose-white': imagePosition === 'background',
                  'text-tv-compose-on-surface': imagePosition !== 'background',
                }
              )}
            >
              {title}
            </Text>
          )}

          {/* Subtitle */}
          {subtitle && (
            <Text 
              variant={config.subtitleVariant}
              className={cn(
                {
                  'text-tv-compose-white opacity-90': imagePosition === 'background',
                  'text-tv-compose-on-surface opacity-80': imagePosition !== 'background',
                }
              )}
            >
              {subtitle}
            </Text>
          )}

          {/* Description */}
          {description && (
            <Text 
              variant={config.descriptionVariant}
              className={cn(
                {
                  'text-tv-compose-white opacity-80': imagePosition === 'background',
                  'text-tv-compose-on-surface opacity-70': imagePosition !== 'background',
                }
              )}
            >
              {description}
            </Text>
          )}

          {/* Metadata */}
          {metadata && metadata.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {metadata.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon && (
                    <div className="w-4 h-4 opacity-70">
                      {item.icon}
                    </div>
                  )}
                  <Text 
                    variant="body-small"
                    className={cn(
                      {
                        'text-tv-compose-white opacity-80': imagePosition === 'background',
                        'text-tv-compose-on-surface opacity-60': imagePosition !== 'background',
                      }
                    )}
                  >
                    <span className="font-medium">{item.label}:</span> {item.value}
                  </Text>
                </div>
              ))}
            </div>
          )}

          {/* Custom Children */}
          {children && (
            <div className="flex-1">
              {children}
            </div>
          )}

          {/* Actions */}
          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || 'filled'}
                  size={size === 'xl' ? 'lg' : size === 'sm' ? 'sm' : 'md'}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  icon={action.icon}
                  className={imagePosition === 'background' ? 'text-tv-compose-black' : undefined}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Focus Ring */}
        {isFocused && isInteractive && (
          <div className="absolute inset-0 ring-2 ring-tv-compose-primary-40 rounded-tv-lg" />
        )}
      </div>
    );
  }
);

ContentBlock.displayName = 'ContentBlock'; 