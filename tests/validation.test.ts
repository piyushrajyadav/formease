/**
 * @jest-environment jsdom
 */

import {
  validateEmail,
  validateUrl,
  validateTel,
  validatePassword,
  validateNumber,
  validateDate,
  validateInput,
  validateForm,
  detectInputType,
  validateByType,
} from '../src/validate';

describe('FormEase Validation Module', () => {
  describe('Email Validation', () => {
    test('validates correct email addresses', () => {
      expect(validateEmail('test@example.com').isValid).toBe(true);
      expect(validateEmail('user.name+tag@example.co.uk').isValid).toBe(true);
    });

    test('rejects invalid email addresses', () => {
      expect(validateEmail('invalid').isValid).toBe(false);
      expect(validateEmail('test@').isValid).toBe(false);
      expect(validateEmail('@example.com').isValid).toBe(false);
      expect(validateEmail('test @example.com').isValid).toBe(false);
    });
  });

  describe('URL Validation', () => {
    test('validates correct URLs', () => {
      expect(validateUrl('https://example.com').isValid).toBe(true);
      expect(validateUrl('http://www.example.com').isValid).toBe(true);
      expect(validateUrl('https://example.com/path?query=value').isValid).toBe(true);
    });

    test('rejects invalid URLs', () => {
      expect(validateUrl('not-a-url').isValid).toBe(false);
      expect(validateUrl('ftp://example.com').isValid).toBe(false);
      expect(validateUrl('example.com').isValid).toBe(false);
    });
  });

  describe('Phone Number Validation', () => {
    test('validates correct phone numbers', () => {
      expect(validateTel('1234567890').isValid).toBe(true);
      expect(validateTel('+1 (555) 123-4567').isValid).toBe(true);
      expect(validateTel('555-123-4567').isValid).toBe(true);
    });

    test('rejects invalid phone numbers', () => {
      expect(validateTel('12345').isValid).toBe(false);
      expect(validateTel('abc').isValid).toBe(false);
    });
  });

  describe('Password Validation', () => {
    test('validates strong passwords', () => {
      expect(validatePassword('Password123').isValid).toBe(true);
      expect(validatePassword('StrongP@ss1').isValid).toBe(true);
    });

    test('rejects weak passwords', () => {
      expect(validatePassword('password').isValid).toBe(false);
      expect(validatePassword('PASSWORD').isValid).toBe(false);
      expect(validatePassword('12345678').isValid).toBe(false);
      expect(validatePassword('Pass1').isValid).toBe(false);
    });
  });

  describe('Number Validation', () => {
    test('validates numbers', () => {
      expect(validateNumber('123').isValid).toBe(true);
      expect(validateNumber('123.45').isValid).toBe(true);
      expect(validateNumber('-10').isValid).toBe(true);
    });

    test('rejects non-numbers', () => {
      expect(validateNumber('abc').isValid).toBe(false);
      expect(validateNumber('').isValid).toBe(false);
    });
  });

  describe('Date Validation', () => {
    test('validates dates', () => {
      expect(validateDate('2024-01-01').isValid).toBe(true);
      expect(validateDate('01/01/2024').isValid).toBe(true);
    });

    test('rejects invalid dates', () => {
      expect(validateDate('not-a-date').isValid).toBe(false);
      expect(validateDate('').isValid).toBe(false);
    });
  });

  describe('Input Type Detection', () => {
    test('detects input types correctly', () => {
      const emailInput = document.createElement('input');
      emailInput.type = 'email';
      expect(detectInputType(emailInput)).toBe('email');

      const numberInput = document.createElement('input');
      numberInput.type = 'number';
      expect(detectInputType(numberInput)).toBe('number');

      const textarea = document.createElement('textarea');
      expect(detectInputType(textarea)).toBe('textarea');

      const select = document.createElement('select');
      expect(detectInputType(select)).toBe('select');
    });
  });

  describe('Validate Input with Rules', () => {
    test('validates required fields', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = '';

      const result = validateInput(input, { required: true });
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBeDefined();
    });

    test('validates min/max length', () => {
      const input = document.createElement('input');
      input.type = 'text';

      input.value = 'abc';
      expect(validateInput(input, { minLength: 5 }).isValid).toBe(false);

      input.value = 'abcdef';
      expect(validateInput(input, { minLength: 5 }).isValid).toBe(true);

      input.value = 'abcdefghijk';
      expect(validateInput(input, { maxLength: 10 }).isValid).toBe(false);
    });

    test('validates min/max for numbers', () => {
      const input = document.createElement('input');
      input.type = 'number';

      input.value = '5';
      expect(validateInput(input, { min: 10 }).isValid).toBe(false);

      input.value = '15';
      expect(validateInput(input, { min: 10 }).isValid).toBe(true);

      input.value = '25';
      expect(validateInput(input, { max: 20 }).isValid).toBe(false);
    });

    test('validates with custom pattern', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = 'abc123';

      const pattern = /^[a-z]+$/;
      expect(validateInput(input, { pattern }).isValid).toBe(false);

      input.value = 'abcdef';
      expect(validateInput(input, { pattern }).isValid).toBe(true);
    });

    test('validates with custom validator', () => {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = 'test';

      const customValidator = (value: string | boolean) => ({
        isValid: typeof value === 'string' && value.length > 10,
        errorMessage: 'Must be longer than 10 characters',
      });

      const result = validateInput(input, { custom: customValidator });
      expect(result.isValid).toBe(false);
      expect(result.errorMessage).toBe('Must be longer than 10 characters');
    });

    test('skips validation for empty non-required fields', () => {
      const input = document.createElement('input');
      input.type = 'email';
      input.value = '';

      const result = validateInput(input);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Validate Form', () => {
    test('validates all fields in a form', () => {
      const form = document.createElement('form');

      const emailInput = document.createElement('input');
      emailInput.type = 'email';
      emailInput.name = 'email';
      emailInput.value = 'invalid-email';
      form.appendChild(emailInput);

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.name = 'name';
      nameInput.value = '';
      form.appendChild(nameInput);

      const errors = validateForm(form, {
        email: { required: true },
        name: { required: true },
      });

      expect(Object.keys(errors).length).toBeGreaterThan(0);
      expect(errors.email).toBeDefined();
      expect(errors.name).toBeDefined();
    });

    test('returns empty object for valid form', () => {
      const form = document.createElement('form');

      const emailInput = document.createElement('input');
      emailInput.type = 'email';
      emailInput.name = 'email';
      emailInput.value = 'test@example.com';
      form.appendChild(emailInput);

      const errors = validateForm(form, {
        email: { required: true },
      });

      expect(Object.keys(errors).length).toBe(0);
    });
  });

  describe('Validate By Type', () => {
    test('validates different types correctly', () => {
      expect(validateByType('test@example.com', 'email').isValid).toBe(true);
      expect(validateByType('invalid', 'email').isValid).toBe(false);
      expect(validateByType('https://example.com', 'url').isValid).toBe(true);
      expect(validateByType('123', 'number').isValid).toBe(true);
      expect(validateByType('abc', 'number').isValid).toBe(false);
    });
  });
});
