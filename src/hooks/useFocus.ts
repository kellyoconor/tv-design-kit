import { useCallback, useRef, useState } from 'react';

/**
 * Hook for managing focus state in TV interfaces
 * Provides utilities for programmatic focus management
 */
export function useFocus<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  const [isFocused, setIsFocused] = useState(false);

  const focus = useCallback(() => {
    ref.current?.focus();
  }, []);

  const blur = useCallback(() => {
    ref.current?.blur();
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return {
    ref,
    isFocused,
    focus,
    blur,
    focusProps: {
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  };
} 