import React from 'react';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

export interface FocusManagerProps {
  children: React.ReactNode;
  onEscape?: () => void;
  onBack?: () => void;
  disabled?: boolean;
}

export const FocusManager: React.FC<FocusManagerProps> = ({
  children,
  onEscape,
  onBack,
  disabled = false,
}) => {
  useKeyboardNavigation({
    onEscape,
    onBack,
    disabled,
  });

  return <>{children}</>;
}; 