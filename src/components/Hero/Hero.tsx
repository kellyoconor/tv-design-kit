import React from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  backgroundImage?: string;
  variant?: 'featured' | 'immersive' | 'banner';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  badge?: string;
  rating?: string;
  year?: string;
  duration?: string;
  className?: string;
}

export const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({
    className,
    title,
    description,
    backgroundImage,
    variant = 'featured',
    size = 'lg',
    primaryAction,
    secondaryAction,
    badge,
    rating,
    year,
    duration,
    ...props
  }, ref) => {
    
    // Size configurations
    const sizeConfig = {
      sm: {
        minHeight: 'min-h-[40vh]',
        padding: 'p-6 pb-8',
        maxWidth: 'max-w-lg',
        titleVariant: 'headline-medium' as const,
        descriptionVariant: 'body-large' as const,
      },
      md: {
        minHeight: 'min-h-[50vh]', 
        padding: 'p-8 pb-10',
        maxWidth: 'max-w-xl',
        titleVariant: 'headline-large' as const,
        descriptionVariant: 'body-large' as const,
      },
      lg: {
        minHeight: 'min-h-[60vh]',
        padding: 'p-8 pb-12',
        maxWidth: 'max-w-2xl',
        titleVariant: 'display-small' as const,
        descriptionVariant: 'title-large' as const,
      },
      xl: {
        minHeight: 'min-h-[70vh]',
        padding: 'p-10 pb-16',
        maxWidth: 'max-w-3xl',
        titleVariant: 'display-medium' as const,
        descriptionVariant: 'title-large' as const,
      },
    };

    const config = sizeConfig[size];

    // Variant-specific styling
    const variantClasses = cn({
      // Featured - full immersive with overlay
      'bg-gradient-to-t from-tv-compose-black via-tv-compose-black/60 to-transparent': variant === 'featured',
      // Immersive - edge-to-edge with stronger overlay
      'bg-gradient-to-r from-tv-compose-black via-tv-compose-black/80 to-tv-compose-black/40': variant === 'immersive',
      // Banner - more traditional with contained content
      'bg-gradient-to-b from-transparent via-tv-compose-black/40 to-tv-compose-black': variant === 'banner',
    });

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex items-end overflow-hidden rounded-tv-lg',
          config.minHeight,
          variantClasses,
          className
        )}
        {...props}
      >
        {/* Background Image */}
        {backgroundImage && (
          <div className="absolute inset-0 -z-10">
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Additional overlay for better text readability */}
            <div className={cn(
              'absolute inset-0',
              {
                'bg-gradient-to-t from-tv-compose-black/80 via-tv-compose-black/40 to-transparent': variant === 'featured',
                'bg-gradient-to-r from-tv-compose-black/90 via-tv-compose-black/60 to-tv-compose-black/30': variant === 'immersive', 
                'bg-gradient-to-b from-transparent via-tv-compose-black/30 to-tv-compose-black/80': variant === 'banner',
              }
            )} />
          </div>
        )}
        
        {/* Content */}
        <div className={cn('relative z-10 w-full', config.padding, config.maxWidth)}>
          {/* Meta information */}
          {(badge || rating || year || duration) && (
            <div className="flex items-center gap-3 mb-4">
              {badge && (
                <span className="px-2 py-1 bg-tv-compose-primary-40 text-tv-compose-white text-tv-label-small rounded-tv-sm">
                  {badge}
                </span>
              )}
              {rating && (
                <Text variant="body-small" color="on-surface" opacity={0.8}>
                  ★ {rating}
                </Text>
              )}
              {year && (
                <Text variant="body-small" color="on-surface" opacity={0.8}>
                  {year}
                </Text>
              )}
              {duration && (
                <Text variant="body-small" color="on-surface" opacity={0.8}>
                  {duration}
                </Text>
              )}
            </div>
          )}
          
          <Text 
            as="h1" 
            variant={config.titleVariant}
            color="white"
            className="mb-4"
          >
            {title}
          </Text>
          
          {description && (
            <Text 
              variant={config.descriptionVariant}
              color="on-surface" 
              opacity={0.9}
              className="mb-8 line-clamp-3"
            >
              {description}
            </Text>
          )}
          
          {/* Actions */}
          {(primaryAction || secondaryAction) && (
            <div className="flex items-center gap-4">
              {primaryAction && (
                <Button
                  size="lg"
                  variant="filled"
                  onClick={primaryAction.onClick}
                  icon={primaryAction.icon}
                >
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={secondaryAction.onClick}
                  icon={secondaryAction.icon}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Hero.displayName = 'Hero'; 