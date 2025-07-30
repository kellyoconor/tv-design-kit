import React from 'react';
import { cn } from '../../utils/cn';
import { useFocus } from '../../hooks/useFocus';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';

export interface CarouselItem {
  id: string;
  title?: string;
  subtitle?: string;
  image?: string;
  content?: React.ReactNode;
  onClick?: () => void;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  itemsPerView?: number;
  gap?: 'sm' | 'md' | 'lg';
  showArrows?: boolean;
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  onItemClick?: (item: CarouselItem, index: number) => void;
  renderItem?: (item: CarouselItem, index: number) => React.ReactNode;
  className?: string;
}

export interface CarouselControlsProps {
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
  showArrows?: boolean;
  showDots?: boolean;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({
    items,
    itemsPerView = 4,
    gap = 'md',
    showArrows = true,
    showDots = false,
    autoPlay = false,
    autoPlayInterval = 5000,
    loop = true,
    onItemClick,
    renderItem,
    className,
    ...props
  }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const autoPlayRef = React.useRef<NodeJS.Timeout>();

    // Combine refs
    React.useImperativeHandle(ref, () => carouselRef.current!, []);

    // Auto-play functionality
    React.useEffect(() => {
      if (autoPlay && items.length > itemsPerView) {
        autoPlayRef.current = setInterval(() => {
          setCurrentIndex(prev => {
            const maxIndex = Math.max(0, items.length - itemsPerView);
            if (prev >= maxIndex) {
              return loop ? 0 : maxIndex;
            }
            return prev + 1;
          });
        }, autoPlayInterval);

        return () => {
          if (autoPlayRef.current) {
            clearInterval(autoPlayRef.current);
          }
        };
      }
    }, [autoPlay, autoPlayInterval, items.length, itemsPerView, loop]);

    // Navigation functions
    const goToPrevious = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      
      setCurrentIndex(prev => {
        if (prev <= 0) {
          return loop ? Math.max(0, items.length - itemsPerView) : 0;
        }
        return prev - 1;
      });
    };

    const goToNext = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      
      setCurrentIndex(prev => {
        const maxIndex = Math.max(0, items.length - itemsPerView);
        if (prev >= maxIndex) {
          return loop ? 0 : maxIndex;
        }
        return prev + 1;
      });
    };

    const goToIndex = (index: number) => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      setCurrentIndex(Math.max(0, Math.min(index, items.length - itemsPerView)));
    };

    // Gap classes
    const gapClasses = {
      'sm': 'gap-tv-sm',    // 16px
      'md': 'gap-tv-md',    // 24px  
      'lg': 'gap-tv-lg',    // 32px
    };

    // Calculate transform
    const itemWidth = `calc((100% - ${(itemsPerView - 1)} * var(--gap)) / ${itemsPerView})`;
    const translateX = `calc(-${currentIndex} * (${itemWidth} + var(--gap)))`;

    const maxIndex = Math.max(0, items.length - itemsPerView);
    const canGoLeft = currentIndex > 0;
    const canGoRight = currentIndex < maxIndex;

    return (
      <div 
        ref={carouselRef}
        className={cn('relative', className)}
        style={{ '--gap': gap === 'sm' ? '16px' : gap === 'md' ? '24px' : '32px' } as React.CSSProperties}
        {...props}
      >
        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Items Container */}
          <div 
            className={cn(
              'flex transition-transform duration-300 ease-out',
              gapClasses[gap]
            )}
            style={{ 
              transform: `translateX(${translateX})`,
            }}
          >
            {items.map((item, index) => (
              <div 
                key={item.id}
                className="flex-shrink-0"
                style={{ width: itemWidth }}
              >
                {renderItem ? renderItem(item, index) : (
                  <DefaultCarouselItem 
                    item={item} 
                    index={index}
                    onClick={onItemClick}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {showArrows && items.length > itemsPerView && (
            <CarouselControls
              currentIndex={currentIndex}
              totalItems={items.length}
              onPrevious={goToPrevious}
              onNext={goToNext}
              showArrows={true}
              showDots={false}
            />
          )}
        </div>

        {/* Dots Indicator */}
        {showDots && maxIndex > 0 && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-200',
                  {
                    'bg-tv-compose-primary-40': currentIndex === index,
                    'bg-tv-compose-on-surface opacity-40 hover:opacity-60': currentIndex !== index,
                  }
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel';

// Default carousel item component
interface DefaultCarouselItemProps {
  item: CarouselItem;
  index: number;
  onClick?: (item: CarouselItem, index: number) => void;
}

const DefaultCarouselItem: React.FC<DefaultCarouselItemProps> = ({ item, index, onClick }) => {
  const { ref: focusRef, isFocused, focusProps } = useFocus<HTMLDivElement>();

  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
    }
    if (onClick) {
      onClick(item, index);
    }
  };

  const interactiveProps = (item.onClick || onClick) ? {
    role: 'button',
    tabIndex: 0,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    onClick: handleClick,
    ...focusProps,
  } : {};

  return (
    <div
      ref={focusRef}
      className={cn(
        'relative rounded-tv-md overflow-hidden transition-all duration-200',
        'bg-tv-compose-surface-variant',
        {
          'cursor-pointer hover:scale-105': item.onClick || onClick,
          'scale-110 shadow-tv-focus': isFocused,
        }
      )}
      {...interactiveProps}
    >
      {/* Custom Content */}
      {item.content ? (
        item.content
      ) : (
        <>
          {/* Image */}
          {item.image && (
            <div className="aspect-video w-full">
              <img 
                src={item.image} 
                alt={item.title || ''} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Text Content */}
          {(item.title || item.subtitle) && (
            <div className="p-4">
              {item.title && (
                <Text variant="title-small" color="on-surface" className="mb-1">
                  {item.title}
                </Text>
              )}
              {item.subtitle && (
                <Text variant="body-medium" color="on-surface" className="opacity-70">
                  {item.subtitle}
                </Text>
              )}
            </div>
          )}
        </>
      )}

      {/* Focus indicator */}
      {isFocused && (
        <div className="absolute inset-0 ring-2 ring-tv-compose-primary-40 rounded-tv-md" />
      )}
    </div>
  );
};

// Carousel Controls Component
const CarouselControls: React.FC<CarouselControlsProps> = ({
  currentIndex,
  totalItems,
  onPrevious,
  onNext,
  showArrows = true,
}) => {
  if (!showArrows) return null;

  return (
    <>
      {/* Previous Button */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="md"
          onClick={onPrevious}
          className="bg-tv-compose-black bg-opacity-60 text-tv-compose-white hover:bg-opacity-80"
          aria-label="Previous items"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
      </div>

      {/* Next Button */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="md"
          onClick={onNext}
          className="bg-tv-compose-black bg-opacity-60 text-tv-compose-white hover:bg-opacity-80"
          aria-label="Next items"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Button>
      </div>
    </>
  );
}; 