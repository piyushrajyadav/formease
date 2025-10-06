/**
 * @jest-environment jsdom
 */

import { ErrorHandler, createErrorHandler } from '../src/errors';

describe('FormEase Error Handler Module', () => {
  let form: HTMLFormElement;

  beforeEach(() => {
    form = document.createElement('form');

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.id = 'name';
    form.appendChild(nameInput);

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.id = 'email';
    form.appendChild(emailInput);

    document.body.appendChild(form);
  });

  afterEach(() => {
    document.body.removeChild(form);
  });

  test('shows error for a field', () => {
    const errorHandler = new ErrorHandler(form);
    errorHandler.showError('name', 'Name is required');

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    expect(nameInput.classList.contains('formify-invalid')).toBe(true);
    expect(nameInput.getAttribute('aria-invalid')).toBe('true');

    const errorElement = form.querySelector('.formify-error');
    expect(errorElement).not.toBeNull();
    expect(errorElement?.textContent).toBe('Name is required');
  });

  test('hides error for a field', () => {
    const errorHandler = new ErrorHandler(form);
    errorHandler.showError('name', 'Name is required');
    errorHandler.hideError('name');

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    expect(nameInput.classList.contains('formify-invalid')).toBe(false);
    expect(nameInput.getAttribute('aria-invalid')).toBe('false');

    const errorElement = form.querySelector('.formify-error');
    expect(errorElement).toBeNull();
  });

  test('shows multiple errors at once', () => {
    const errorHandler = new ErrorHandler(form);
    errorHandler.showErrors({
      name: 'Name is required',
      email: 'Invalid email',
    });

    const errorElements = form.querySelectorAll('.formify-error');
    expect(errorElements.length).toBe(2);
  });

  test('clears all errors', () => {
    const errorHandler = new ErrorHandler(form);
    errorHandler.showErrors({
      name: 'Name is required',
      email: 'Invalid email',
    });

    errorHandler.clearErrors();

    const errorElements = form.querySelectorAll('.formify-error');
    expect(errorElements.length).toBe(0);
  });

  test('checks if field has error', () => {
    const errorHandler = new ErrorHandler(form);
    errorHandler.showError('name', 'Name is required');

    expect(errorHandler.hasError('name')).toBe(true);
    expect(errorHandler.hasError('email')).toBe(false);
  });

  test('gets all current errors', () => {
    const errorHandler = new ErrorHandler(form);
    errorHandler.showErrors({
      name: 'Name is required',
      email: 'Invalid email',
    });

    const errors = errorHandler.getErrors();
    expect(errors.name).toBe('Name is required');
    expect(errors.email).toBe('Invalid email');
  });

  test('uses custom error class', () => {
    const errorHandler = new ErrorHandler(form, {
      errorClass: 'custom-error',
      invalidClass: 'custom-invalid',
    });

    errorHandler.showError('name', 'Name is required');

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    expect(nameInput.classList.contains('custom-invalid')).toBe(true);

    const errorElement = form.querySelector('.custom-error');
    expect(errorElement).not.toBeNull();
  });

  test('positions error message before input', () => {
    const errorHandler = new ErrorHandler(form, {
      errorPosition: 'before',
    });

    errorHandler.showError('name', 'Name is required');

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    const previousSibling = nameInput.previousSibling;
    expect(previousSibling).not.toBeNull();
    expect((previousSibling as HTMLElement).classList.contains('formify-error')).toBe(true);
  });

  test('uses custom error renderer', () => {
    const customRenderer = jest.fn();
    const errorHandler = new ErrorHandler(form, {
      customRenderer,
    });

    errorHandler.showError('name', 'Name is required');

    expect(customRenderer).toHaveBeenCalled();
  });

  test('focuses first invalid field', () => {
    const errorHandler = new ErrorHandler(form, {
      focusOnError: true,
    });

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    const focusSpy = jest.spyOn(nameInput, 'focus');

    errorHandler.showErrors({
      name: 'Name is required',
      email: 'Invalid email',
    });

    expect(focusSpy).toHaveBeenCalled();
  });

  test('createErrorHandler creates instance', () => {
    const errorHandler = createErrorHandler(form);
    expect(errorHandler).toBeInstanceOf(ErrorHandler);
  });

  test('destroys instance and clears errors', () => {
    const errorHandler = new ErrorHandler(form);
    errorHandler.showError('name', 'Name is required');
    errorHandler.destroy();

    const errorElements = form.querySelectorAll('.formify-error');
    expect(errorElements.length).toBe(0);
  });
});
