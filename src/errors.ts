/**
 * FormEase Error Handling Module
 * @module errors
 */

import type { ErrorConfig, ErrorMap } from './types';

/**
 * Default error configuration
 */
const DEFAULT_CONFIG: Required<Omit<ErrorConfig, 'errorContainer' | 'customRenderer'>> = {
  errorClass: 'formify-error',
  invalidClass: 'formify-invalid',
  focusOnError: true,
  errorPosition: 'after',
};

/**
 * ErrorHandler class for managing form validation errors
 */
export class ErrorHandler {
  private form: HTMLFormElement;
  private config: ErrorConfig;
  private errorElements: Map<string, HTMLElement> = new Map();

  /**
   * Creates an ErrorHandler instance
   * @param form - The form element
   * @param config - Error handling configuration
   */
  constructor(form: HTMLFormElement, config?: ErrorConfig) {
    this.form = form;
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Shows an error for a specific field
   * @param fieldName - The name or id of the field
   * @param message - Error message to display
   */
  public showError(fieldName: string, message: string): void {
    const element = this.getFieldElement(fieldName);
    if (!element) {
      console.warn(`FormEase: Field "${fieldName}" not found`);
      return;
    }

    // Remove existing error if present (but keep the invalid class)
    const existingError = this.errorElements.get(fieldName);
    if (existingError) {
      existingError.remove();
      this.errorElements.delete(fieldName);
    }

    // Add invalid class to input
    element.classList.add(this.config.invalidClass || DEFAULT_CONFIG.invalidClass);
    element.setAttribute('aria-invalid', 'true');

    // Create and display error message
    if (this.config.customRenderer) {
      this.config.customRenderer(element, message);
    } else {
      this.renderDefaultError(element, fieldName, message);
    }
  }

  /**
   * Renders the default error message
   * @param element - The input element
   * @param fieldName - The field name
   * @param message - Error message
   */
  private renderDefaultError(
    element: HTMLElement,
    fieldName: string,
    message: string
  ): void {
    const errorElement = document.createElement('span');
    errorElement.className = this.config.errorClass || DEFAULT_CONFIG.errorClass;
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    errorElement.setAttribute('aria-live', 'polite');
    errorElement.id = `${fieldName}-error`;
    element.setAttribute('aria-describedby', errorElement.id);

    // Position error message
    const position = this.config.errorPosition || DEFAULT_CONFIG.errorPosition;
    if (position === 'after') {
      element.parentElement?.insertBefore(errorElement, element.nextSibling);
    } else if (position === 'before') {
      element.parentElement?.insertBefore(errorElement, element);
    } else if (position === 'custom' && this.config.errorContainer) {
      const container = document.querySelector(this.config.errorContainer);
      container?.appendChild(errorElement);
    }

    this.errorElements.set(fieldName, errorElement);
  }

  /**
   * Hides the error for a specific field
   * @param fieldName - The name or id of the field
   */
  public hideError(fieldName: string): void {
    const element = this.getFieldElement(fieldName);
    if (element) {
      element.classList.remove(this.config.invalidClass || DEFAULT_CONFIG.invalidClass);
      element.setAttribute('aria-invalid', 'false');
      element.removeAttribute('aria-describedby');
    }

    const errorElement = this.errorElements.get(fieldName);
    if (errorElement && errorElement.parentElement) {
      errorElement.parentElement.removeChild(errorElement);
      this.errorElements.delete(fieldName);
    }
  }

  /**
   * Shows multiple errors at once
   * @param errors - Map of field names to error messages
   */
  public showErrors(errors: ErrorMap): void {
    // Clear all existing errors first
    this.clearErrors();

    let firstInvalidField: HTMLElement | null = null;

    Object.entries(errors).forEach(([fieldName, message]) => {
      this.showError(fieldName, message);
      if (!firstInvalidField) {
        firstInvalidField = this.getFieldElement(fieldName);
      }
    });

    // Focus on first invalid field if configured
    if (
      firstInvalidField &&
      (this.config.focusOnError ?? DEFAULT_CONFIG.focusOnError)
    ) {
      (firstInvalidField as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).focus();
    }
  }

  /**
   * Clears all errors from the form
   */
  public clearErrors(): void {
    this.errorElements.forEach((_, fieldName) => {
      this.hideError(fieldName);
    });
  }

  /**
   * Gets a field element by name or id
   * @param fieldName - The field name or id
   * @returns The field element or null
   */
  private getFieldElement(fieldName: string): HTMLElement | null {
    return (
      this.form.querySelector<HTMLElement>(`[name="${fieldName}"]`) ||
      this.form.querySelector<HTMLElement>(`#${fieldName}`)
    );
  }

  /**
   * Checks if a field has an error
   * @param fieldName - The field name
   * @returns True if the field has an error
   */
  public hasError(fieldName: string): boolean {
    return this.errorElements.has(fieldName);
  }

  /**
   * Gets all current errors
   * @returns Map of field names to error messages
   */
  public getErrors(): ErrorMap {
    const errors: ErrorMap = {};
    this.errorElements.forEach((element, fieldName) => {
      errors[fieldName] = element.textContent || '';
    });
    return errors;
  }

  /**
   * Destroys the error handler and clears all errors
   */
  public destroy(): void {
    this.clearErrors();
    this.errorElements.clear();
  }
}

/**
 * Creates an error handler for a form
 * @param form - The form element or selector
 * @param config - Error handling configuration
 * @returns ErrorHandler instance
 */
export function createErrorHandler(
  form: HTMLFormElement | string,
  config?: ErrorConfig
): ErrorHandler {
  const formElement = typeof form === 'string' ? document.querySelector<HTMLFormElement>(form) : form;

  if (!formElement) {
    throw new Error('FormEase: Form element not found');
  }

  return new ErrorHandler(formElement, config);
}
