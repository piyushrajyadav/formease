/**
 * FormEase - A lightweight, intelligent form handling library
 * @module FormEase
 * @author Piyush  Yadav
 * @license MIT
 */

import { validateInput, validateForm, validateByType, detectInputType } from './validate';
import { AutoSave, autoSaveForm } from './autosave';
import { ErrorHandler, createErrorHandler } from './errors';
import type {
  FormifyConfig,
  FormData,
} from './types';

/**
 * Main FormEase class for comprehensive form handling
 */
export class FormEase {
  private form: HTMLFormElement;
  private config: FormifyConfig;
  private autoSave?: AutoSave;
  private errorHandler: ErrorHandler;
  private validationListeners: Array<{ element: HTMLElement; handler: EventListener }> = [];

  /**
   * Creates a FormEase instance
   * @param config - FormEase configuration
   */
  constructor(config: FormifyConfig) {
    const formElement =
      typeof config.form === 'string'
        ? document.querySelector<HTMLFormElement>(config.form)
        : config.form;

    if (!formElement) {
      throw new Error('FormEase: Form element not found');
}

    this.form = formElement;
    this.config = config;
    this.errorHandler = new ErrorHandler(this.form, config.errorHandling);

    this.initialize();
  }

  /**
   * Initializes the FormEase instance
   */
  private initialize(): void {
    // Setup autosave if configured
    if (this.config.autoSave) {
      this.autoSave = new AutoSave(this.form, this.config.autoSave);
    }

    // Setup validation listeners
    this.setupValidationListeners();

    // Setup form submit handler
    this.setupSubmitHandler();
  }

  /**
   * Sets up validation event listeners
   */
  private setupValidationListeners(): void {
    const validationConfig = this.config.validation;
    if (!validationConfig) return;

    const elements = this.form.elements;

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
      ) {
        const name = element.name || element.id;
        if (!name) continue;

        // Validate on blur (only if explicitly enabled)
        if (validationConfig.validateOnBlur === true) {
          const blurHandler = () => {
            const rules = validationConfig.rules?.[name];
            const result = validateInput(element, rules);
            if (!result.isValid && result.errorMessage) {
              this.errorHandler.showError(name, result.errorMessage);
            } else {
              this.errorHandler.hideError(name);
            }
          };
          element.addEventListener('blur', blurHandler);
          this.validationListeners.push({ element, handler: blurHandler });
        }

        // Validate on input (only if explicitly enabled)
        if (validationConfig.validateOnInput === true) {
          const inputHandler = () => {
            const rules = validationConfig.rules?.[name];
            const result = validateInput(element, rules);
            if (!result.isValid && result.errorMessage) {
              if (validationConfig.showErrorsImmediately) {
                this.errorHandler.showError(name, result.errorMessage);
              }
            } else {
              this.errorHandler.hideError(name);
            }
          };
          element.addEventListener('input', inputHandler);
          this.validationListeners.push({ element, handler: inputHandler });
        }
      }
    }
  }

  /**
   * Sets up form submit handler
   */
  private setupSubmitHandler(): void {
    const submitHandler = (e: Event) => {
      e.preventDefault();

      const errors = validateForm(this.form, this.config.validation?.rules);

      if (Object.keys(errors).length > 0) {
        this.errorHandler.showErrors(errors);
        if (this.config.onValidationError) {
          this.config.onValidationError(errors);
        }
      } else {
        this.errorHandler.clearErrors();
        const formData = this.getFormData();
        if (this.config.onValidationSuccess) {
          this.config.onValidationSuccess(formData);
        }
      }
    };

    this.form.addEventListener('submit', submitHandler);
    this.validationListeners.push({ element: this.form, handler: submitHandler });
  }

  /**
   * Gets current form data
   * @returns Form data object
   */
  public getFormData(): FormData {
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
        if (!name) continue;

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
   * Validates the entire form
   * @returns True if form is valid
   */
  public validate(): boolean {
    const errors = validateForm(this.form, this.config.validation?.rules);
    if (Object.keys(errors).length > 0) {
      this.errorHandler.showErrors(errors);
      return false;
    }
    this.errorHandler.clearErrors();
    return true;
  }

  /**
   * Resets the form and clears all errors
   */
  public reset(): void {
    this.form.reset();
    this.errorHandler.clearErrors();
    this.autoSave?.clearStorage();
  }

  /**
   * Destroys the FormEase instance
   */
  public destroy(): void {
    this.validationListeners.forEach(({ element, handler }) => {
      element.removeEventListener('blur', handler);
      element.removeEventListener('input', handler);
      element.removeEventListener('submit', handler);
    });
    this.validationListeners = [];
    this.autoSave?.destroy();
    this.errorHandler.destroy();
  }
}

/**
 * Creates a FormEase instance
 * @param config - FormEase configuration
 * @returns FormEase instance
 */
export function createFormify(config: FormifyConfig): FormEase {
  return new FormEase(config);
}

// Export everything
export * from './validate';
export * from './autosave';
export * from './errors';
export * from './types';

// Default export
export default {
  FormEase,
  createFormify,
  validateInput,
  validateForm,
  validateByType,
  detectInputType,
  autoSaveForm,
  AutoSave,
  createErrorHandler,
  ErrorHandler,
};
