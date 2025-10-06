/**
 * FormEase AutoSave Module
 * @module autosave
 */

import type { AutoSaveConfig, FormData } from './types';

/**
 * Default autosave configuration
 */
const DEFAULT_CONFIG: Required<Omit<AutoSaveConfig, 'onSave' | 'onRestore'>> = {
  storageKey: 'formify_autosave',
  debounceDelay: 500,
  excludeFields: ['password', 'password_confirmation'],
  clearOnSubmit: true,
};

/**
 * AutoSave class for managing form data persistence
 */
export class AutoSave {
  private form: HTMLFormElement;
  private config: AutoSaveConfig;
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private listeners: Array<{ element: HTMLElement; handler: EventListener }> = [];

  /**
   * Creates an AutoSave instance
   * @param form - The form element to autosave
   * @param config - Autosave configuration
   */
  constructor(form: HTMLFormElement, config?: AutoSaveConfig) {
    this.form = form;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.initialize();
  }

  /**
   * Initializes autosave functionality
   */
  private initialize(): void {
    this.restoreFormData();
    this.attachListeners();
  }

  /**
   * Attaches event listeners to form inputs
   */
  private attachListeners(): void {
    const elements = this.form.elements;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
      ) {
        const name = element.name || element.id;
        if (!name || this.config.excludeFields?.includes(name)) continue;

        const handler = () => this.handleInput();
        element.addEventListener('input', handler as EventListener);
        element.addEventListener('change', handler as EventListener);

        this.listeners.push({ element, handler: handler as EventListener });
      }
    }

    // Clear storage on form submit if configured
    if (this.config.clearOnSubmit) {
      const submitHandler = (_e: Event) => {
        // Check if form is valid before clearing
        if (this.form.checkValidity()) {
          this.clearStorage();
        }
      };
      this.form.addEventListener('submit', submitHandler);
      this.listeners.push({ element: this.form, handler: submitHandler });
    }
  }

  /**
   * Handles input events with debouncing
   */
  private handleInput(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.saveFormData();
    }, this.config.debounceDelay || DEFAULT_CONFIG.debounceDelay);
  }

  /**
   * Extracts form data
   * @returns Form data object
   */
  private extractFormData(): FormData {
    const data: FormData = {};
    const elements = this.form.elements;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
      ) {
        const name = element.name || element.id;
        if (!name || this.config.excludeFields?.includes(name)) continue;

        if (element instanceof HTMLInputElement) {
          if (element.type === 'checkbox') {
            data[name] = element.checked;
          } else if (element.type === 'radio') {
            if (element.checked) {
              data[name] = element.value;
            }
          } else {
            data[name] = element.value;
          }
        } else {
          data[name] = element.value;
        }
      }
    }

    return data;
  }

  /**
   * Saves form data to localStorage
   */
  public saveFormData(): void {
    try {
      const data = this.extractFormData();
      const storageKey = this.config.storageKey || DEFAULT_CONFIG.storageKey;
      localStorage.setItem(storageKey, JSON.stringify(data));

      if (this.config.onSave) {
        this.config.onSave(data);
      }
    } catch (error) {
      console.error('FormEase: Failed to save form data', error);
    }
  }

  /**
   * Restores form data from localStorage
   */
  public restoreFormData(): void {
    try {
      const storageKey = this.config.storageKey || DEFAULT_CONFIG.storageKey;
      const savedData = localStorage.getItem(storageKey);

      if (!savedData) return;

      const data: FormData = JSON.parse(savedData);
      const elements = this.form.elements;

      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (
          element instanceof HTMLInputElement ||
          element instanceof HTMLTextAreaElement ||
          element instanceof HTMLSelectElement
        ) {
          const name = element.name || element.id;
          if (!name || !(name in data)) continue;

          const value = data[name];

          if (element instanceof HTMLInputElement) {
            if (element.type === 'checkbox') {
              element.checked = Boolean(value);
            } else if (element.type === 'radio') {
              element.checked = element.value === value;
            } else {
              element.value = String(value);
            }
          } else {
            element.value = String(value);
          }
        }
      }

      if (this.config.onRestore) {
        this.config.onRestore(data);
      }
    } catch (error) {
      console.error('FormEase: Failed to restore form data', error);
    }
  }

  /**
   * Clears saved form data from localStorage
   */
  public clearStorage(): void {
    try {
      const storageKey = this.config.storageKey || DEFAULT_CONFIG.storageKey;
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error('FormEase: Failed to clear storage', error);
    }
  }

  /**
   * Destroys the autosave instance and removes all listeners
   */
  public destroy(): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.listeners.forEach(({ element, handler }) => {
      element.removeEventListener('input', handler);
      element.removeEventListener('change', handler);
      element.removeEventListener('submit', handler);
    });

    this.listeners = [];
  }
}

/**
 * Creates and initializes an autosave instance for a form
 * @param form - The form element or selector
 * @param config - Autosave configuration
 * @returns AutoSave instance
 */
export function autoSaveForm(
  form: HTMLFormElement | string,
  config?: AutoSaveConfig
): AutoSave {
  const formElement = typeof form === 'string' ? document.querySelector<HTMLFormElement>(form) : form;

  if (!formElement) {
    throw new Error('FormEase: Form element not found');
  }

  return new AutoSave(formElement, config);
}
