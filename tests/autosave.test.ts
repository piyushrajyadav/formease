/**
 * @jest-environment jsdom
 */

import { AutoSave, autoSaveForm } from '../src/autosave';

describe('FormEase AutoSave Module', () => {
  let form: HTMLFormElement;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    // Create a test form
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

    const checkboxInput = document.createElement('input');
    checkboxInput.type = 'checkbox';
    checkboxInput.name = 'subscribe';
    checkboxInput.id = 'subscribe';
    form.appendChild(checkboxInput);

    document.body.appendChild(form);
  });

  afterEach(() => {
    document.body.removeChild(form);
    localStorage.clear();
  });

  test('saves form data to localStorage', (done) => {
    const autoSave = new AutoSave(form, {
      storageKey: 'test_form',
      debounceDelay: 100,
    });

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    nameInput.value = 'John Doe';
    nameInput.dispatchEvent(new Event('input'));

    setTimeout(() => {
      const saved = localStorage.getItem('test_form');
      expect(saved).not.toBeNull();
      const data = JSON.parse(saved!);
      expect(data.name).toBe('John Doe');
      autoSave.destroy();
      done();
    }, 150);
  });

  test('restores form data from localStorage', () => {
    const testData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      subscribe: true,
    };

    localStorage.setItem('test_form', JSON.stringify(testData));

    new AutoSave(form, { storageKey: 'test_form' });

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    const emailInput = form.querySelector<HTMLInputElement>('#email')!;
    const subscribeInput = form.querySelector<HTMLInputElement>('#subscribe')!;

    expect(nameInput.value).toBe('Jane Doe');
    expect(emailInput.value).toBe('jane@example.com');
    expect(subscribeInput.checked).toBe(true);
  });

  test('excludes specified fields from autosave', (done) => {
    const autoSave = new AutoSave(form, {
      storageKey: 'test_form',
      debounceDelay: 100,
      excludeFields: ['email'],
    });

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    const emailInput = form.querySelector<HTMLInputElement>('#email')!;

    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';
    nameInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('input'));

    setTimeout(() => {
      const saved = localStorage.getItem('test_form');
      const data = JSON.parse(saved!);
      expect(data.name).toBe('John Doe');
      expect(data.email).toBeUndefined();
      autoSave.destroy();
      done();
    }, 150);
  });

  test('clears storage when form is submitted', () => {
    const autoSave = new AutoSave(form, {
      storageKey: 'test_form',
      clearOnSubmit: true,
    });

    localStorage.setItem('test_form', JSON.stringify({ name: 'Test' }));

    form.dispatchEvent(new Event('submit'));

    expect(localStorage.getItem('test_form')).toBeNull();
    autoSave.destroy();
  });

  test('calls onSave callback when data is saved', (done) => {
    const onSave = jest.fn();
    const autoSave = new AutoSave(form, {
      storageKey: 'test_form',
      debounceDelay: 100,
      onSave,
    });

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    nameInput.value = 'John Doe';
    nameInput.dispatchEvent(new Event('input'));

    setTimeout(() => {
      expect(onSave).toHaveBeenCalled();
      autoSave.destroy();
      done();
    }, 150);
  });

  test('calls onRestore callback when data is restored', () => {
    const onRestore = jest.fn();
    const testData = { name: 'John Doe' };

    localStorage.setItem('test_form', JSON.stringify(testData));

    new AutoSave(form, {
      storageKey: 'test_form',
      onRestore,
    });

    expect(onRestore).toHaveBeenCalledWith(testData);
  });

  test('autoSaveForm function creates AutoSave instance', () => {
    const instance = autoSaveForm(form);
    expect(instance).toBeInstanceOf(AutoSave);
    instance.destroy();
  });

  test('destroys instance and removes listeners', (done) => {
    const autoSave = new AutoSave(form, {
      storageKey: 'test_form',
      debounceDelay: 100,
    });

    autoSave.destroy();

    const nameInput = form.querySelector<HTMLInputElement>('#name')!;
    nameInput.value = 'John Doe';
    nameInput.dispatchEvent(new Event('input'));

    setTimeout(() => {
      const saved = localStorage.getItem('test_form');
      expect(saved).toBeNull();
      done();
    }, 150);
  });
});
