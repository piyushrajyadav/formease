/**
 * FormEase Type Definitions
 * @module types
 */

/**
 * Supported input types for validation
 */
export type InputType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'date'
  | 'checkbox'
  | 'radio'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select';

/**
 * Validation result interface
 */
export interface ValidationResult {
  /** Whether the validation passed */
  isValid: boolean;
  /** Error message if validation failed */
  errorMessage?: string;
}

/**
 * Custom validation function type
 * @param value - The value to validate
 * @param element - The DOM element being validated
 * @returns ValidationResult object
 */
export type CustomValidator = (
  value: string | boolean,
  element?: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
) => ValidationResult;

/**
 * Validation rule configuration
 */
export interface ValidationRule {
  /** Whether the field is required */
  required?: boolean;
  /** Minimum length for text inputs */
  minLength?: number;
  /** Maximum length for text inputs */
  maxLength?: number;
  /** Minimum value for number inputs */
  min?: number;
  /** Maximum value for number inputs */
  max?: number;
  /** Regular expression pattern */
  pattern?: RegExp;
  /** Custom validation function */
  custom?: CustomValidator;
  /** Custom error message */
  errorMessage?: string;
}

/**
 * Configuration for form validation
 */
export interface ValidationConfig {
  /** Validation rules for each field */
  rules?: Record<string, ValidationRule>;
  /** Whether to validate on blur */
  validateOnBlur?: boolean;
  /** Whether to validate on input */
  validateOnInput?: boolean;
  /** Whether to show errors immediately */
  showErrorsImmediately?: boolean;
}

/**
 * Configuration for autosave functionality
 */
export interface AutoSaveConfig {
  /** Storage key for saved data */
  storageKey?: string;
  /** Debounce delay in milliseconds */
  debounceDelay?: number;
  /** Fields to exclude from autosave */
  excludeFields?: string[];
  /** Whether to clear storage on submit */
  clearOnSubmit?: boolean;
  /** Callback when data is saved */
  onSave?: (data: Record<string, string | boolean>) => void;
  /** Callback when data is restored */
  onRestore?: (data: Record<string, string | boolean>) => void;
}

/**
 * Configuration for error handling and display
 */
export interface ErrorConfig {
  /** CSS class for error messages */
  errorClass?: string;
  /** CSS class for invalid inputs */
  invalidClass?: string;
  /** Whether to focus first invalid input */
  focusOnError?: boolean;
  /** Position of error message */
  errorPosition?: 'after' | 'before' | 'custom';
  /** Custom error container selector */
  errorContainer?: string;
  /** Custom error message renderer */
  customRenderer?: (element: HTMLElement, message: string) => void;
}

/**
 * Main FormEase configuration
 */
export interface FormifyConfig {
  /** Form element or selector */
  form: HTMLFormElement | string;
  /** Validation configuration */
  validation?: ValidationConfig;
  /** Autosave configuration */
  autoSave?: AutoSaveConfig;
  /** Error handling configuration */
  errorHandling?: ErrorConfig;
  /** Callback on successful validation */
  onValidationSuccess?: (data: Record<string, string | boolean>) => void;
  /** Callback on validation failure */
  onValidationError?: (errors: Record<string, string>) => void;
}

/**
 * Form field data type
 */
export type FormData = Record<string, string | boolean>;

/**
 * Error map type
 */
export type ErrorMap = Record<string, string>;
