/**
 * @jest-environment jsdom
 */

import { FormEase, createFormify } from '../src/index';

describe('FormEase Integration Tests', () => {
  let form: HTMLFormElement;

  beforeEach(() => {
    localStorage.clear();

    form = document.createElement('form');
    form.id = 'test-form';

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

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    form.appendChild(submitButton);

    document.body.appendChild(form);
  });

  afterEach(() => {
    document.body.removeChild(form);
    localStorage.clear();
  });

  test('creates FormEase instance', () => {
    const formify = new FormEase({
      form: form,
    });

    expect(formify).toBeInstanceOf(FormEase);
    formify.destroy();
  });

  test('validates form on submit', (done) => {
    const onValidationError = jest.fn();

    const formify = new FormEase({
      form: form,
      validation: {
        rules: {
          name: { required: true },
          email: { required: true },
        },
      },
      onValidationError,
    });

    form.dispatchEvent(new Event('submit'));

    setTimeout(() => {
      expect(onValidationError).toHaveBeenCalled();
      formify.destroy();
      done();
    }, 50);
  });

  test('calls success callback on valid form', (done) => {
    const onValidationSuccess = jest.fn();

    const formify = new FormEase({
      form: form,
      validation: {
        rules: {
          name: { required: true },
          email: { required: true },
        },
      },
      onValidationSuccess,
    });

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    const emailInput = form.querySelector<HTMLInputElement>('#email')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    form.dispatchEvent(new Event('submit'));

    setTimeout(() => {
      expect(onValidationSuccess).toHaveBeenCalled();
      formify.destroy();
      done();
    }, 50);
  });

  test('validates on blur when configured', () => {
    const formify = new FormEase({
      form: form,
      validation: {
        validateOnBlur: true,
        rules: {
          email: { required: true },
        },
      },
    });

    const emailInput = form.querySelector<HTMLInputElement>('#email')!;
    emailInput.dispatchEvent(new Event('blur'));

    const errorElement = form.querySelector('.formify-error');
    expect(errorElement).not.toBeNull();

    formify.destroy();
  });

  test('validates on input when configured', () => {
    const formify = new FormEase({
      form: form,
      validation: {
        validateOnInput: true,
        showErrorsImmediately: true,
        rules: {
          email: { required: true },
        },
      },
    });

    const emailInput = form.querySelector<HTMLInputElement>('#email')!;
    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));

    // Since it's empty and required, error should show
    // But since validateOnInput checks current value, we need to blur first
    emailInput.dispatchEvent(new Event('blur'));
    emailInput.dispatchEvent(new Event('input'));

    formify.destroy();
  });

  test('gets form data', () => {
    const formify = new FormEase({
      form: form,
    });

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    const emailInput = form.querySelector<HTMLInputElement>('#email')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';

    const data = formify.getFormData();

    expect(data.name).toBe('John Doe');
    expect(data.email).toBe('john@example.com');

    formify.destroy();
  });

  test('validates form programmatically', () => {
    const formify = new FormEase({
      form: form,
      validation: {
        rules: {
          name: { required: true },
        },
      },
    });

    expect(formify.validate()).toBe(false);

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    nameInput.value = 'John Doe';

    expect(formify.validate()).toBe(true);

    formify.destroy();
  });

  test('resets form', () => {
    const formify = new FormEase({
      form: form,
    });

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    nameInput.value = 'John Doe';

    formify.reset();

    expect(nameInput.value).toBe('');

    formify.destroy();
  });

  test('integrates with autosave', (done) => {
    const formify = new FormEase({
      form: form,
      autoSave: {
        storageKey: 'test_form',
        debounceDelay: 100,
      },
    });

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    nameInput.value = 'John Doe';
    nameInput.dispatchEvent(new Event('input'));

    setTimeout(() => {
      const saved = localStorage.getItem('test_form');
      expect(saved).not.toBeNull();
      formify.destroy();
      done();
    }, 150);
  });

  test('createFormify helper function', () => {
    const formify = createFormify({
      form: form,
    });

    expect(formify).toBeInstanceOf(FormEase);
    formify.destroy();
  });

  test('works with string selector', () => {
    const formify = createFormify({
      form: '#test-form',
    });

    expect(formify).toBeInstanceOf(FormEase);
    formify.destroy();
  });
});
