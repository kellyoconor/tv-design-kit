import { useCallback, useEffect } from 'react';

export interface KeyboardNavigationOptions {
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onEnter?: () => void;
  onEscape?: () => void;
  onBack?: () => void;
  disabled?: boolean;
}

/**
 * Hook for handling keyboard navigation in TV interfaces
 * Supports directional navigation and common TV remote controls
 */
export function useKeyboardNavigation({
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onEnter,
  onEscape,
  onBack,
  disabled = false,
}: KeyboardNavigationOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (disabled) return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          onArrowUp?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          onArrowDown?.();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onArrowLeft?.();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onArrowRight?.();
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          onEnter?.();
          break;
        case 'Escape':
          event.preventDefault();
          onEscape?.();
          break;
        case 'Backspace':
          event.preventDefault();
          onBack?.();
          break;
      }
    },
    [disabled, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onEnter, onEscape, onBack]
  );

  useEffect(() => {
    if (disabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, disabled]);

  return { handleKeyDown };
} 