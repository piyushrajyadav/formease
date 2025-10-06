/**
 * FormEase Validation Module
 * @module validate
 */

import type {
  InputType,
  ValidationResult,
  ValidationRule,
  CustomValidator,
} from './types';

/**
 * Regular expressions for common validation patterns
 */
const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  tel: /^[\d\s\-\+\(\)]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  numeric: /^\d+$/,
};

/**
 * Default error messages for validation
 */
const DEFAULT_ERROR_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  url: 'Please enter a valid URL',
  tel: 'Please enter a valid phone number',
  password:
    'Password must be at least 8 characters with uppercase, lowercase, and number',
  number: 'Please enter a valid number',
  date: 'Please enter a valid date',
  minLength: 'Minimum length is {min} characters',
  maxLength: 'Maximum length is {max} characters',
  min: 'Minimum value is {min}',
  max: 'Maximum value is {max}',
  pattern: 'Invalid format',
};

/**
 * Detects the input type from an HTML element
 * @param element - The input element
 * @returns The detected input type
 */
export function detectInputType(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
): InputType {
  if (element instanceof HTMLTextAreaElement) {
    return 'textarea';
  }
  if (element instanceof HTMLSelectElement) {
    return 'select';
  }
  if (element instanceof HTMLInputElement) {
    const type = element.type.toLowerCase();
    if (
      [
        'text',
        'email',
        'number',
        'password',
        'date',
        'checkbox',
        'radio',
        'tel',
        'url',
      ].includes(type)
    ) {
      return type as InputType;
    }
  }
  return 'text';
}

/**
 * Validates an email address
 * @param value - The email to validate
 * @returns Validation result
 */
export function validateEmail(value: string): ValidationResult {
  const isValid = VALIDATION_PATTERNS.email.test(value);
  return {
    isValid,
    errorMessage: isValid ? undefined : DEFAULT_ERROR_MESSAGES.email,
  };
}

/**
 * Validates a URL
 * @param value - The URL to validate
 * @returns Validation result
 */
export function validateUrl(value: string): ValidationResult {
  const isValid = VALIDATION_PATTERNS.url.test(value);
  return {
    isValid,
    errorMessage: isValid ? undefined : DEFAULT_ERROR_MESSAGES.url,
  };
}

/**
 * Validates a phone number
 * @param value - The phone number to validate
 * @returns Validation result
 */
export function validateTel(value: string): ValidationResult {
  const isValid = VALIDATION_PATTERNS.tel.test(value) && value.length >= 10;
  return {
    isValid,
    errorMessage: isValid ? undefined : DEFAULT_ERROR_MESSAGES.tel,
  };
}

/**
 * Validates a password (at least 8 chars, uppercase, lowercase, number)
 * @param value - The password to validate
 * @returns Validation result
 */
export function validatePassword(value: string): ValidationResult {
  const isValid = VALIDATION_PATTERNS.password.test(value);
  return {
    isValid,
    errorMessage: isValid ? undefined : DEFAULT_ERROR_MESSAGES.password,
  };
}

/**
 * Validates a number
 * @param value - The number to validate
 * @returns Validation result
 */
export function validateNumber(value: string): ValidationResult {
  const isValid = !isNaN(Number(value)) && value.trim() !== '';
  return {
    isValid,
    errorMessage: isValid ? undefined : DEFAULT_ERROR_MESSAGES.number,
  };
}

/**
 * Validates a date
 * @param value - The date to validate
 * @returns Validation result
 */
export function validateDate(value: string): ValidationResult {
  const date = new Date(value);
  const isValid = !isNaN(date.getTime()) && value.trim() !== '';
  return {
    isValid,
    errorMessage: isValid ? undefined : DEFAULT_ERROR_MESSAGES.date,
  };
}

/**
 * Validates a text input
 * @param _value - The text to validate
 * @returns Validation result
 */
export function validateText(_value: string): ValidationResult {
  return {
    isValid: true,
  };
}

/**
 * Validates based on input type
 * @param value - The value to validate
 * @param type - The input type
 * @returns Validation result
 */
export function validateByType(value: string, type: InputType): ValidationResult {
  if (type === 'checkbox' || type === 'radio' || type === 'select' || type === 'textarea') {
    return { isValid: true };
  }

  switch (type) {
    case 'email':
      return validateEmail(value);
    case 'url':
      return validateUrl(value);
    case 'tel':
      return validateTel(value);
    case 'password':
      return validatePassword(value);
    case 'number':
      return validateNumber(value);
    case 'date':
      return validateDate(value);
    case 'text':
    default:
      return validateText(value);
  }
}

/**
 * Validates an input against a set of rules
 * @param element - The input element to validate
 * @param rules - Validation rules to apply
 * @returns Validation result
 */
export function validateInput(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  rules?: ValidationRule
): ValidationResult {
  const type = detectInputType(element);
  const value =
    element instanceof HTMLInputElement && element.type === 'checkbox'
      ? element.checked.toString()
      : element.value;

  // Check required
  if (rules?.required) {
    if (
      element instanceof HTMLInputElement &&
      (element.type === 'checkbox' || element.type === 'radio')
    ) {
      if (!element.checked) {
        return {
          isValid: false,
          errorMessage: rules.errorMessage || DEFAULT_ERROR_MESSAGES.required,
        };
      }
    } else if (!value || value.trim() === '') {
      return {
        isValid: false,
        errorMessage: rules.errorMessage || DEFAULT_ERROR_MESSAGES.required,
      };
    }
  }

  // If empty and not required, skip validation
  if (!value || value.trim() === '') {
    return { isValid: true };
  }

  // Check min/max length for text inputs
  if (rules?.minLength && value.length < rules.minLength) {
    return {
      isValid: false,
      errorMessage:
        rules.errorMessage ||
        DEFAULT_ERROR_MESSAGES.minLength.replace('{min}', rules.minLength.toString()),
    };
  }

  if (rules?.maxLength && value.length > rules.maxLength) {
    return {
      isValid: false,
      errorMessage:
        rules.errorMessage ||
        DEFAULT_ERROR_MESSAGES.maxLength.replace('{max}', rules.maxLength.toString()),
    };
  }

  // Check min/max for number inputs
  if (type === 'number') {
    const numValue = Number(value);
    if (rules?.min !== undefined && numValue < rules.min) {
      return {
        isValid: false,
        errorMessage:
          rules.errorMessage ||
          DEFAULT_ERROR_MESSAGES.min.replace('{min}', rules.min.toString()),
      };
    }
    if (rules?.max !== undefined && numValue > rules.max) {
      return {
        isValid: false,
        errorMessage:
          rules.errorMessage ||
          DEFAULT_ERROR_MESSAGES.max.replace('{max}', rules.max.toString()),
      };
    }
  }

  // Check pattern
  if (rules?.pattern && !rules.pattern.test(value)) {
    return {
      isValid: false,
      errorMessage: rules.errorMessage || DEFAULT_ERROR_MESSAGES.pattern,
    };
  }

  // Check custom validator
  if (rules?.custom) {
    const customResult = rules.custom(value, element);
    if (!customResult.isValid) {
      return customResult;
    }
  }

  // Type-based validation
  const typeResult = validateByType(value, type);
  if (!typeResult.isValid) {
    return {
      isValid: false,
      errorMessage: rules?.errorMessage || typeResult.errorMessage,
    };
  }

  return { isValid: true };
}

/**
 * Validates all inputs in a form
 * @param form - The form element to validate
 * @param rulesMap - Map of field names to validation rules
 * @returns Map of field names to error messages
 */
export function validateForm(
  form: HTMLFormElement,
  rulesMap?: Record<string, ValidationRule>
): Record<string, string> {
  const errors: Record<string, string> = {};
  const elements = form.elements;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
    ) {
      const name = element.name || element.id;
      if (!name) continue;

      const rules = rulesMap?.[name];
      const result = validateInput(element, rules);

      if (!result.isValid && result.errorMessage) {
        errors[name] = result.errorMessage;
      }
    }
  }

  return errors;
}

export { VALIDATION_PATTERNS, DEFAULT_ERROR_MESSAGES };
export type { ValidationResult, ValidationRule, CustomValidator };
