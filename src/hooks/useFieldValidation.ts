/**
 * useFieldValidation.ts
 * 
 * Custom hook for managing field validation UI with proper cleanup.
 * Handles rendering error messages and removing error state on user input.
 * 
 * Key features:
 * - Single listener per field (no accumulation)
 * - Automatic cleanup on unmount
 * - Reusable across components
 * - Zero memory leaks
 * 
 * @author Senior Dev
 */

import { useCallback, useEffect } from 'react';

interface FieldElements {
  alertElement?: HTMLElement | null;
  iconElement?: HTMLElement | null;
  inputElement?: HTMLInputElement | null;
}

/**
 * Safely retrieves DOM elements by ID
 */
const getFieldElements = (fieldName: string): FieldElements => {
  return {
    alertElement: document.getElementById(`${fieldName}-alert`),
    iconElement: document.getElementById(`${fieldName}-icon`),
    inputElement: document.getElementById(fieldName) as HTMLInputElement
  };
};

/**
 * Displays validation error for a specific field
 */
const showFieldError = (fieldName: string, errorMessage: string): void => {
  const { alertElement, iconElement } = getFieldElements(fieldName);
  
  if (alertElement) {
    alertElement.innerHTML = errorMessage;
  }
  
  if (iconElement) {
    iconElement.classList.add('fas', 'fa-exclamation');
  }
};

/**
 * Clears validation error from a specific field
 */
const clearFieldError = (fieldName: string): void => {
  const { alertElement, iconElement } = getFieldElements(fieldName);
  
  if (alertElement) {
    alertElement.innerHTML = '';
  }
  
  if (iconElement) {
    iconElement.classList.remove('fas', 'fa-exclamation');
  }
};

/**
 * Custom hook: manages field validation with proper event listener cleanup
 * 
 * Usage:
 * const { displayError, clearError } = useFieldValidation();
 * 
 * // In your component:
 * if (validation fails) {
 *   displayError('fieldName', 'Error message');
 * }
 */
export const useFieldValidation = () => {
  // Refs to track listeners for cleanup
  const listenerMap = new Map<string, (event: Event) => void>();

  /**
   * Sets up auto-clear listener on field input
   * Only one listener per field (no accumulation)
   */
  const setupFieldListener = useCallback((fieldName: string): void => {
    const { inputElement } = getFieldElements(fieldName);
    
    if (!inputElement) return;
    
    // Remove old listener if exists
    if (listenerMap.has(fieldName)) {
      const oldListener = listenerMap.get(fieldName)!;
      inputElement.removeEventListener('input', oldListener);
    }
    
    // Create new listener (only once per field)
    const newListener = () => {
      clearFieldError(fieldName);
      // Remove listener after first use
      inputElement.removeEventListener('input', newListener);
      listenerMap.delete(fieldName);
    };
    
    // Add listener and store reference
    inputElement.addEventListener('input', newListener, { once: true });
    listenerMap.set(fieldName, newListener);
  }, []);

  /**
   * Display error message and setup auto-clear on input
   */
  const displayError = useCallback((fieldName: string, errorMessage: string): void => {
    if (!errorMessage) {
      clearFieldError(fieldName);
      return;
    }
    
    showFieldError(fieldName, errorMessage);
    setupFieldListener(fieldName);
  }, [setupFieldListener]);

  /**
   * Manually clear error
   */
  const clearError = useCallback((fieldName: string): void => {
    clearFieldError(fieldName);
    
    // Clean up listener if exists
    if (listenerMap.has(fieldName)) {
      const { inputElement } = getFieldElements(fieldName);
      if (inputElement) {
        const listener = listenerMap.get(fieldName)!;
        inputElement.removeEventListener('input', listener);
      }
      listenerMap.delete(fieldName);
    }
  }, []);

  /**
   * Cleanup all listeners on unmount
   */
  useEffect(() => {
    return () => {
      listenerMap.forEach((listener, fieldName) => {
        const { inputElement } = getFieldElements(fieldName);
        if (inputElement) {
          inputElement.removeEventListener('input', listener);
        }
      });
      listenerMap.clear();
    };
  }, []);

  return {
    displayError,
    clearError
  };
};
