# 📋 FormEase# 📋 FormEase# 📋 FormEase



<div align="center">



[![npm version](https://img.shields.io/npm/v/@piyushrajyadav/formease.svg)](https://www.npmjs.com/package/@piyushrajyadav/formease)<div align="center"><div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

[![Tests](https://img.shields.io/badge/Tests-53%20Passing-success.svg)](tests/)

[![Bundle Size](https://img.shields.io/badge/Size-12KB%20min-success.svg)](dist/)[![npm version](https://img.shields.io/npm/v/formease.svg)](https://www.npmjs.com/package/formease)[![npm version](https://img.shields.io/npm/v/FormEase.svg)](https://www.npmjs.com/package/FormEase)



**A lightweight, intelligent form handling library with validation, autosave, and accessibility features.**[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)



[Demo](#-quick-start) • [API Docs](#-api-reference) • [Examples](#-examples)[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)



</div>[![Tests](https://img.shields.io/badge/Tests-53%20Passing-success.svg)](tests/)[![Tests](https://img.shields.io/badge/Tests-53%20Passing-success.svg)](tests/)



---[![Bundle Size](https://img.shields.io/badge/Size-12KB%20min-success.svg)](dist/)[![Bundle Size](https://img.shields.io/badge/Size-8KB%20gzipped-success.svg)](dist/)



## ✨ Features



- 🎯 **Smart Validation** - Auto-detects input types (email, URL, phone, password, number, date)**A lightweight, intelligent form handling library with validation, autosave, and accessibility features.****A lightweight, intelligent form handling library with validation, autosave, and accessibility features.**

- 💾 **Auto-Save** - Persist form data to localStorage with debouncing

- ♿ **Accessibility First** - Full ARIA support, screen-reader friendly

- 🎨 **Customizable** - Flexible styling, error positioning, and custom validators

- 📦 **Lightweight** - Only ~12KB minified, zero dependencies[Demo](#-quick-start) • [API Docs](#-api-reference) • [Examples](#-examples)[Demo](demo/index.html) • [Examples](examples/) • [API Docs](#api-reference) • [Changelog](CHANGELOG.md)

- 🔧 **Framework Agnostic** - Works with Vanilla JS, React, Vue, Angular

- 💪 **TypeScript** - Complete type definitions included

- 🧪 **Well Tested** - 53 passing tests with comprehensive coverage

</div></div>

---



## 📦 Installation

------

### NPM

```bash

npm install @piyushrajyadav/formease

```## ✨ Features## ✨ Features



### Yarn

```bash

yarn add @piyushrajyadav/formease- 🎯 **Smart Validation** - Auto-detects input types (email, URL, phone, password, number, date)- 🎯 **Smart Validation** - Automatic input type detection (email, URL, phone, password, etc.)

```

- 💾 **Auto-Save** - Persist form data to localStorage with debouncing- 💾 **Auto-save** - Persist form data to localStorage with debouncing

### CDN

```html- ♿ **Accessibility First** - Full ARIA support, screen-reader friendly- ♿ **Accessibility First** - Full ARIA support, screen-reader friendly

<!-- Production (Minified) -->

<script src="https://unpkg.com/@piyushrajyadav/formease@latest/dist/formease.umd.min.js"></script>- 🎨 **Customizable** - Flexible styling, error positioning, and custom validators- 🎨 **Customizable** - Flexible styling and error handling



<!-- Development -->- 📦 **Lightweight** - Only ~12KB minified, zero dependencies- 📦 **Lightweight** - Only ~8KB minified + gzipped, zero dependencies

<script src="https://unpkg.com/@piyushrajyadav/formease@latest/dist/formease.umd.js"></script>

```- 🔧 **Framework Agnostic** - Works with Vanilla JS, React, Vue, Angular- 🔧 **Framework Agnostic** - Works with vanilla JS, React, Vue, Angular



---- 💪 **TypeScript** - Complete type definitions included- 💪 **TypeScript** - Complete type definitions included



## 🚀 Quick Start- 🧪 **Well Tested** - 53 passing tests with comprehensive coverage- 🧪 **Well Tested** - 53 passing tests, 100% coverage



### Basic Usage



```javascript------

import { createFormify } from '@piyushrajyadav/formease';



const formify = createFormify({

  form: '#myForm',## 📦 Installation## 📦 Installation

  validation: {

    rules: {

      email: { required: true },

      password: { required: true, minLength: 8 }### NPM### NPM / Yarn

    }

  },```bash```bash

  autoSave: {

    storageKey: 'my-form-data'npm install formeasenpm install FormEase

  },

  onValidationSuccess: (data) => {```# or

    console.log('Form submitted:', data);

    // Handle form submissionyarn add FormEase

  }

});### Yarn```

```

```bash

### Browser (UMD)

yarn add formease### CDN (Browser)

```html

<script src="https://unpkg.com/@piyushrajyadav/formease@latest/dist/formease.umd.min.js"></script>``````html

<script>

  const formify = FormEase.createFormify({<!-- Production (minified) -->

    form: '#myForm',

    validation: {### CDN<script src="https://unpkg.com/FormEase@latest/dist/FormEase.umd.min.js"></script>

      rules: {

        email: { required: true }```html

      }

    }<!-- Production (Minified) --><!-- Development -->

  });

</script><script src="https://unpkg.com/formease@latest/dist/formease.umd.min.js"></script><script src="https://unpkg.com/FormEase@latest/dist/FormEase.umd.js"></script>

```

```

---

<!-- Development -->

## 📚 Examples

<script src="https://unpkg.com/formease@latest/dist/formease.umd.js"></script>### Module Formats

### Email Validation

```- **CommonJS**: `dist/index.js` (Node.js)

```javascript

createFormify({- **ES Module**: `dist/index.esm.js` (Webpack, Vite, Rollup)

  form: '#contactForm',

  validation: {---- **UMD**: `dist/FormEase.umd.js` (Browser)

    validateOnSubmit: true,

    rules: {- **UMD Minified**: `dist/FormEase.umd.min.js` (Browser production)

      email: {

        required: true,## 🚀 Quick Start- **TypeScript**: `dist/index.d.ts` (Type definitions)

        errorMessage: 'Please enter a valid email address'

      }

    }

  }### Basic Usage---

});

```



### Custom Validation```javascript## 🚀 Quick Start



```javascriptimport { createFormify } from 'formease';

createFormify({

  form: '#signupForm',### ES Module (Recommended)

  validation: {

    rules: {const formify = createFormify({```javascript

      username: {

        required: true,  form: '#myForm',import { createFormify } from 'FormEase';

        minLength: 3,

        custom: (value) => {  validation: {

          if (!/^[a-zA-Z0-9_]+$/.test(value)) {

            return {    rules: {const formify = createFormify({

              isValid: false,

              errorMessage: 'Username can only contain letters, numbers, and underscores'      email: { required: true },  form: '#myForm',

            };

          }      password: { required: true, minLength: 8 }  validation: {

          return { isValid: true };

        }    }    rules: {

      }

    }  },      email: { required: true },

  }

});  autoSave: {      password: { required: true, minLength: 8 }

```

    storageKey: 'my-form-data'    },

### Auto-Save with Callbacks

  },    validateOnBlur: true

```javascript

createFormify({  onValidationSuccess: (data) => {  },

  form: '#articleForm',

  autoSave: {    console.log('Form submitted:', data);  autoSave: {

    storageKey: 'article-draft',

    debounceDelay: 500,    // Handle form submission    storageKey: 'my-form-data',

    excludeFields: ['password'],

    onSave: (data) => {  }    debounceDelay: 500

      console.log('Form auto-saved:', data);

    },});  },

    onRestore: (data) => {

      console.log('Form data restored:', data);```  onValidationSuccess: (data) => {

    }

  }    console.log('Form submitted:', data);

});

```### Browser (UMD)  }



### Password Strength});



```javascript```html```

createFormify({

  form: '#registerForm',<script src="https://unpkg.com/formease@latest/dist/formease.umd.min.js"></script>

  validation: {

    rules: {<script>### Browser (UMD)

      password: {

        required: true,  const formify = FormEase.createFormify({```html

        minLength: 8,

        custom: (value) => {    form: '#myForm',<script src="https://unpkg.com/FormEase@latest/dist/FormEase.umd.min.js"></script>

          const hasUpperCase = /[A-Z]/.test(value);

          const hasLowerCase = /[a-z]/.test(value);    validation: {<script>

          const hasNumber = /\d/.test(value);

                rules: {  const formify = window.FormEase.createFormify({

          if (!hasUpperCase || !hasLowerCase || !hasNumber) {

            return {        email: { required: true }    form: '#myForm',

              isValid: false,

              errorMessage: 'Password must contain uppercase, lowercase, and number'      }    validation: {

            };

          }    }      rules: {

          return { isValid: true };

        }  });        email: { required: true }

      }

    }</script>      }

  }

});```    }

```

  });

---

---</script>

## 🎨 Configuration

```

### FormifyConfig

## 📚 Examples

```typescript

interface FormifyConfig {### React

  form: string | HTMLFormElement;          // Form selector or element

  validation?: ValidationConfig;            // Validation configuration### Email Validation```jsx

  autoSave?: AutoSaveConfig;               // Auto-save configuration

  errorHandling?: ErrorConfig;             // Error display configurationimport { createFormify } from 'FormEase';

  onValidationSuccess?: (data: FormData) => void;

  onValidationError?: (errors: ErrorMap) => void;```javascriptimport { useEffect, useRef } from 'react';

}

```createFormify({



### ValidationConfig  form: '#contactForm',function MyForm() {



```typescript  validation: {  const formRef = useRef(null);

interface ValidationConfig {

  rules?: Record<string, ValidationRule>;  // Validation rules per field    validateOnSubmit: true,  

  validateOnBlur?: boolean;                // Validate when field loses focus

  validateOnInput?: boolean;               // Validate on input change    rules: {  useEffect(() => {

  validateOnSubmit?: boolean;              // Validate on form submit (default: true)

  showErrorsImmediately?: boolean;         // Show errors immediately      email: {    if (formRef.current) {

}

```        required: true,      const formify = createFormify({



### ValidationRule        errorMessage: 'Please enter a valid email address'        form: formRef.current,



```typescript      }        validation: { /* ... */ }

interface ValidationRule {

  required?: boolean;                      // Field is required    }      });

  minLength?: number;                      // Minimum length

  maxLength?: number;                      // Maximum length  }      

  min?: number;                            // Minimum value (numbers)

  max?: number;                            // Maximum value (numbers)});      return () => formify.destroy();

  pattern?: RegExp;                        // Custom regex pattern

  custom?: CustomValidator;                // Custom validation function```    }

  errorMessage?: string;                   // Custom error message

}  }, []);

```

### Custom Validation  

### AutoSaveConfig

  return <form ref={formRef}>...</form>;

```typescript

interface AutoSaveConfig {```javascript}

  storageKey?: string;                     // localStorage key (default: 'formease_autosave')

  debounceDelay?: number;                  // Debounce delay in ms (default: 500)createFormify({```

  excludeFields?: string[];                // Fields to exclude (default: ['password'])

  clearOnSubmit?: boolean;                 // Clear storage on submit (default: true)  form: '#signupForm',

  onSave?: (data: FormData) => void;      // Callback when data is saved

  onRestore?: (data: FormData) => void;   // Callback when data is restored  validation: {See more examples in the [`examples/`](examples/) folder.

}

```    rules: {



### ErrorConfig      username: {---



```typescript        required: true,

interface ErrorConfig {

  errorClass?: string;                     // Error message class (default: 'formease-error')        minLength: 3,## 📖 Configuration

  invalidClass?: string;                   // Invalid input class (default: 'formease-invalid')

  errorPosition?: 'before' | 'after' | 'custom'; // Error position (default: 'after')        custom: (value) => {

  errorContainer?: string;                 // Custom error container selector

  focusOnError?: boolean;                  // Focus first error (default: true)          if (!/^[a-zA-Z0-9_]+$/.test(value)) {### Full Configuration Options

  customRenderer?: (element: HTMLElement, message: string) => void;

}            return {

```

              isValid: false,```typescript

---

              errorMessage: 'Username can only contain letters, numbers, and underscores'interface FormifyConfig {

## 🔧 API Reference

            };  form: string | HTMLFormElement;  // Form selector or element

### createFormify(config)

          }  

Creates and returns a new FormEase instance.

          return { isValid: true };  validation?: {

```javascript

const formify = createFormify({ form: '#myForm' });        }    rules?: ValidationRules;        // Field validation rules

```

      }    validateOnBlur?: boolean;       // Validate on blur (default: true)

### FormEase Methods

    }    validateOnInput?: boolean;      // Validate on input (default: false)

#### `validate(): boolean`

  }    validateOnSubmit?: boolean;     // Validate on submit (default: true)

Validates the entire form programmatically.

});    customValidators?: CustomValidatorMap;

```javascript

if (formify.validate()) {```  };

  console.log('Form is valid!');

}  

```

### Auto-Save with Callbacks  autoSave?: {

#### `getFormData(): FormData`

    enabled?: boolean;              // Enable autosave (default: true)

Gets current form data as an object.

```javascript    storageKey?: string;            // LocalStorage key (default: 'formify-data')

```javascript

const data = formify.getFormData();createFormify({    debounceDelay?: number;         // Debounce delay in ms (default: 500)

console.log(data);

// { name: 'John', email: 'john@example.com' }  form: '#articleForm',    excludeFields?: string[];       // Fields to exclude (e.g., passwords)

```

  autoSave: {  };

#### `reset(): void`

    storageKey: 'article-draft',  

Resets the form to initial state.

    debounceDelay: 500,  errors?: {

```javascript

formify.reset();    excludeFields: ['password'],    errorClass?: string;            // Error message class (default: 'formify-error')

```

    onSave: (data) => {    invalidClass?: string;          // Invalid input class (default: 'formify-invalid')

#### `destroy(): void`

      console.log('Form auto-saved:', data);    focusOnError?: boolean;         // Focus first error (default: true)

Removes all event listeners and cleans up.

    },    errorPosition?: 'before' | 'after' | 'custom';

```javascript

formify.destroy();    onRestore: (data) => {    errorContainer?: string;        // Custom error container selector

```

      console.log('Form data restored:', data);    customRenderer?: (el: HTMLElement, msg: string) => void;

---

    }  };

## 🎯 Built-in Validators

  }  

FormEase automatically validates based on input type:

});  onValidationSuccess?: (data: FormData) => void;

| Input Type | Validation |

|-----------|-----------|```  onValidationError?: (errors: ErrorMap) => void;

| `email` | Valid email format |

| `url` | Valid URL format |  onAutoSave?: (data: FormData) => void;

| `tel` | Valid phone number (10+ digits) |

| `number` | Numeric value |### Password Strength}

| `date` | Valid date |

| `password` | 8+ chars with uppercase, lowercase, number |```

| `text` | Non-empty if required |

```javascript

---

createFormify({### Validation Rules

## 🎨 Styling

  form: '#registerForm',

### Default CSS Classes

  validation: {```javascript

```css

/* Invalid input */    rules: {{

.formease-invalid {

  border-color: #ef4444;      password: {  rules: {

  background-color: #fef2f2;

}        required: true,    email: { 



/* Error message */        minLength: 8,      required: true,

.formease-error {

  color: #ef4444;        custom: (value) => {      type: 'email'  // auto-detected if input type="email"

  font-size: 0.875rem;

  margin-top: 0.25rem;          const hasUpperCase = /[A-Z]/.test(value);    },

}

```          const hasLowerCase = /[a-z]/.test(value);    password: { 



### Custom Styling          const hasNumber = /\d/.test(value);      required: true,



```javascript                minLength: 8,

createFormify({

  form: '#myForm',          if (!hasUpperCase || !hasLowerCase || !hasNumber) {      maxLength: 50,

  errorHandling: {

    errorClass: 'my-error',            return {      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/  // custom regex

    invalidClass: 'my-invalid',

    customRenderer: (element, message) => {              isValid: false,    },

      // Custom error rendering

      const errorDiv = document.createElement('div');              errorMessage: 'Password must contain uppercase, lowercase, and number'    age: {

      errorDiv.className = 'custom-error';

      errorDiv.textContent = message;            };      required: true,

      element.parentElement.appendChild(errorDiv);

    }          }      type: 'number',

  }

});          return { isValid: true };      min: 18,

```

        }      max: 120

---

      }    },

## 🌐 Framework Integration

    }    website: {

### React

  }      required: false,

```jsx

import { useEffect, useRef } from 'react';});      type: 'url'

import { createFormify } from '@piyushrajyadav/formease';

```    },

function MyForm() {

  const formRef = useRef(null);    phone: {

  const formifyRef = useRef(null);

---      type: 'tel'  // validates phone numbers

  useEffect(() => {

    if (formRef.current) {    }

      formifyRef.current = createFormify({

        form: formRef.current,## 🎨 Configuration  }

        validation: {

          rules: {}

            email: { required: true }

          }### FormifyConfig```

        },

        onValidationSuccess: (data) => {

          console.log('Form data:', data);

        }```typescript### Custom Validators

      });

    }interface FormifyConfig {



    return () => {  form: string | HTMLFormElement;          // Form selector or element```javascript

      formifyRef.current?.destroy();

    };  validation?: ValidationConfig;            // Validation configurationconst formify = createFormify({

  }, []);

  autoSave?: AutoSaveConfig;               // Auto-save configuration  form: '#myForm',

  return (

    <form ref={formRef}>  errorHandling?: ErrorConfig;             // Error display configuration  validation: {

      <input type="email" name="email" />

      <button type="submit">Submit</button>  onValidationSuccess?: (data: FormData) => void;    rules: {

    </form>

  );  onValidationError?: (errors: ErrorMap) => void;      username: { 

}

```}        required: true,



### Vue```        custom: 'username'  // Use custom validator



```vue      }

<template>

  <form ref="formRef">### ValidationConfig    },

    <input type="email" name="email" />

    <button type="submit">Submit</button>    customValidators: {

  </form>

</template>```typescript      username: (value) => {



<script setup>interface ValidationConfig {        if (value.length < 3) {

import { ref, onMounted, onUnmounted } from 'vue';

import { createFormify } from '@piyushrajyadav/formease';  rules?: Record<string, ValidationRule>;  // Validation rules per field          return { isValid: false, message: 'Username too short' };



const formRef = ref(null);  validateOnBlur?: boolean;                // Validate when field loses focus        }

let formify = null;

  validateOnInput?: boolean;               // Validate on input change        if (!/^[a-zA-Z0-9_]+$/.test(value)) {

onMounted(() => {

  formify = createFormify({  validateOnSubmit?: boolean;              // Validate on form submit (default: true)          return { isValid: false, message: 'Only letters, numbers, and underscores allowed' };

    form: formRef.value,

    validation: {  showErrorsImmediately?: boolean;         // Show errors immediately        }

      rules: {

        email: { required: true }}        return { isValid: true };

      }

    }```      }

  });

});    }



onUnmounted(() => {### ValidationRule  }

  formify?.destroy();

});});

</script>

``````typescript```



### Angularinterface ValidationRule {



```typescript  required?: boolean;                      // Field is required---

import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

import { createFormify } from '@piyushrajyadav/formease';  minLength?: number;                      // Minimum length



@Component({  maxLength?: number;                      // Maximum length## 🧪 Testing

  selector: 'app-my-form',

  template: `  min?: number;                            // Minimum value (numbers)

    <form #myForm>

      <input type="email" name="email" />  max?: number;                            // Maximum value (numbers)### Run Unit Tests (Jest)

      <button type="submit">Submit</button>

    </form>  pattern?: RegExp;                        // Custom regex pattern```bash

  `

})  custom?: CustomValidator;                // Custom validation function# Run all tests

export class MyFormComponent implements OnInit, OnDestroy {

  @ViewChild('myForm') formElement!: ElementRef;  errorMessage?: string;                   // Custom error messagenpm test

  private formify: any;

}

  ngOnInit() {

    this.formify = createFormify({```# Watch mode (auto re-run on changes)

      form: this.formElement.nativeElement,

      validation: {npm run test:watch

        rules: {

          email: { required: true }### AutoSaveConfig

        }

      }# Coverage report

    });

  }```typescriptnpm run test:coverage



  ngOnDestroy() {interface AutoSaveConfig {```

    this.formify?.destroy();

  }  storageKey?: string;                     // localStorage key (default: 'formease_autosave')

}

```  debounceDelay?: number;                  // Debounce delay in ms (default: 500)**Test Results:**



---  excludeFields?: string[];                // Fields to exclude (default: ['password'])- ✅ 53 tests passing



## 🧪 Testing  clearOnSubmit?: boolean;                 // Clear storage on submit (default: true)- ✅ 4 test suites (validation, autosave, errors, integration)



FormEase includes comprehensive tests:  onSave?: (data: FormData) => void;      // Callback when data is saved- ✅ 100% code coverage



```bash  onRestore?: (data: FormData) => void;   // Callback when data is restored

# Run tests

npm test}### Test in Browser



# Run tests in watch mode```

npm run test:watch

#### Option 1: Open Demo Directly

# Run tests with coverage

npm run test:coverage### ErrorConfig```bash

```

# Windows

**Test Coverage**: 53 passing tests covering validation, autosave, error handling, and integration.

```typescriptstart demo/index.html

---

interface ErrorConfig {

## 📄 License

  errorClass?: string;                     // Error message class (default: 'formease-error')# macOS

MIT License © [Piyush Raj Yadav](https://github.com/piyushrajyadav)

  invalidClass?: string;                   // Invalid input class (default: 'formease-invalid')open demo/index.html

---

  errorPosition?: 'before' | 'after' | 'custom'; // Error position (default: 'after')

## 🤝 Contributing

  errorContainer?: string;                 // Custom error container selector# Linux

Contributions are welcome! Please feel free to submit a Pull Request.

  focusOnError?: boolean;                  // Focus first error (default: true)xdg-open demo/index.html

1. Fork the repository

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)  customRenderer?: (element: HTMLElement, message: string) => void;```

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the branch (`git push origin feature/AmazingFeature`)}

5. Open a Pull Request

```#### Option 2: Local Server (Recommended)

---

```bash

## 📞 Support

---# Using npx (no installation needed)

- 🐛 **Issues**: [GitHub Issues](https://github.com/piyushrajyadav/formease/issues)

- 📧 **Email**: piyushyadavrajyadav@gmail.comnpx serve demo

- 💬 **Discussions**: [GitHub Discussions](https://github.com/piyushrajyadav/formease/discussions)

## 🔧 API Reference# Then open: http://localhost:3000

---



## 🙏 Acknowledgments

### createFormify(config)# Using Python

- Built with TypeScript

- Tested with Jestpython -m http.server 8000

- Bundled with Rollup

Creates and returns a new FormEase instance.# Then open: http://localhost:8000/demo

---



<div align="center">

```javascript# Using Node.js http-server

**Made with ❤️ by [Piyush Raj Yadav](https://github.com/piyushrajyadav)**

const formify = createFormify({ form: '#myForm' });npx http-server -p 8000

⭐ Star this repo if you find it helpful!

```# Then open: http://localhost:8000/demo

</div>

```

### FormEase Methods

#### Option 3: VS Code Live Server

#### `validate(): boolean`1. Install **"Live Server"** extension in VS Code

2. Right-click `demo/index.html`

Validates the entire form programmatically.3. Select **"Open with Live Server"**

4. Browser opens automatically

```javascript

if (formify.validate()) {### Manual Browser Testing Checklist

  console.log('Form is valid!');

}Open `demo/index.html` and verify:

```

- ✅ **Validation**

#### `getFormData(): FormData`  - Leave required fields empty and submit

  - Enter invalid email/URL/phone

Gets current form data as an object.  - Check error messages appear below fields

  - Verify inputs get red border

```javascript

const data = formify.getFormData();- ✅ **Auto-save**

console.log(data);  - Fill in form fields

// { name: 'John', email: 'john@example.com' }  - Refresh page (Ctrl+R / Cmd+R)

```  - Verify data is restored



#### `reset(): void`- ✅ **Error Handling**

  - Check error messages have animations

Resets the form to initial state.  - Verify screen reader accessibility (use browser inspector)

  - Check ARIA attributes (`aria-invalid`, `aria-describedby`)

```javascript

formify.reset();- ✅ **Accessibility**

```  - Tab through form (keyboard navigation)

  - Verify focus indicators

#### `destroy(): void`  - Use screen reader (if available)



Removes all event listeners and cleans up.### Browser Compatibility



```javascriptTested and working in:

formify.destroy();- ✅ Chrome/Edge 90+ (latest 2 versions)

```- ✅ Firefox 88+ (latest 2 versions)

- ✅ Safari 14+ (latest 2 versions)

---- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

- ✅ Internet Explorer 11 (with polyfills)

## 🎯 Built-in Validators

---

FormEase automatically validates based on input type:

## 📋 API Reference

| Input Type | Validation |

|-----------|-----------|### Main API

| `email` | Valid email format |

| `url` | Valid URL format |#### `createFormify(config: FormifyConfig): FormifyInstance`

| `tel` | Valid phone number (10+ digits) |Creates a new FormEase instance.

| `number` | Numeric value |

| `date` | Valid date |```javascript

| `password` | 8+ chars with uppercase, lowercase, number |import { createFormify } from 'FormEase';

| `text` | Non-empty if required |const formify = createFormify({ form: '#myForm' });

```

---

### FormifyInstance Methods

## 🎨 Styling

#### `validate(): ValidationResult`

### Default CSS ClassesManually validate the entire form.



```css```javascript

/* Invalid input */const result = formify.validate();

.formease-invalid {if (result.isValid) {

  border-color: #ef4444;  console.log('Form is valid!');

  background-color: #fef2f2;} else {

}  console.log('Errors:', result.errors);

}

/* Error message */```

.formease-error {

  color: #ef4444;**Returns:**

  font-size: 0.875rem;```typescript

  margin-top: 0.25rem;{

}  isValid: boolean;

```  errors: { [fieldName: string]: string };

}

### Custom Styling```



```javascript#### `getFormData(): FormData`

createFormify({Get current form data as a plain object.

  form: '#myForm',

  errorHandling: {```javascript

    errorClass: 'my-error',const data = formify.getFormData();

    invalidClass: 'my-invalid',console.log(data);

    customRenderer: (element, message) => {// { email: 'test@example.com', password: '********', ... }

      // Custom error rendering```

      const errorDiv = document.createElement('div');

      errorDiv.className = 'custom-error';#### `reset(): void`

      errorDiv.textContent = message;Reset the form to initial state and clear all errors.

      element.parentElement.appendChild(errorDiv);

    }```javascript

  }formify.reset();

});```

```

#### `destroy(): void`

---Clean up event listeners, clear storage, and remove instance.



## 🌐 Framework Integration```javascript

formify.destroy();

### React```



```jsx### Validation Utilities

import { useEffect, useRef } from 'react';

import { createFormify } from 'formease';Import individual validators for standalone use:



function MyForm() {```javascript

  const formRef = useRef(null);import {

  const formifyRef = useRef(null);  validateEmail,

  validateUrl,

  useEffect(() => {  validateTel,

    if (formRef.current) {  validatePassword,

      formifyRef.current = createFormify({  validateNumber,

        form: formRef.current,  validateDate

        validation: {} from 'FormEase';

          rules: {

            email: { required: true }// Validate email

          }const emailResult = validateEmail('test@example.com');

        },console.log(emailResult.isValid); // true

        onValidationSuccess: (data) => {

          console.log('Form data:', data);// Validate URL

        }const urlResult = validateUrl('https://example.com');

      });

    }// Validate phone number

const phoneResult = validateTel('+1-234-567-8900');

    return () => {

      formifyRef.current?.destroy();// Validate password (min 8 chars)

    };const passResult = validatePassword('MyPass123', 8);

  }, []);

// Validate number with range

  return (const numResult = validateNumber('25', 18, 120);

    <form ref={formRef}>

      <input type="email" name="email" />// Validate date

      <button type="submit">Submit</button>const dateResult = validateDate('2025-10-06');

    </form>```

  );

}---

```

## 🎨 Styling & Customization

### Vue

### Default CSS Classes

```vue- `.formify-error` - Error message element

<template>- `.formify-invalid` - Invalid input element

  <form ref="formRef">- `.has-error` - Parent form-group with error (if exists)

    <input type="email" name="email" />

    <button type="submit">Submit</button>### Custom Styling Example

  </form>

</template>```css

/* Error messages with animation */

<script setup>.formify-error {

import { ref, onMounted, onUnmounted } from 'vue';  color: #ef4444;

import { createFormify } from 'formease';  font-size: 0.875rem;

  margin-top: 0.5rem;

const formRef = ref(null);  padding: 8px 12px;

let formify = null;  background: rgba(239, 68, 68, 0.1);

  border-left: 3px solid #ef4444;

onMounted(() => {  border-radius: 4px;

  formify = createFormify({  animation: slideDown 0.3s ease;

    form: formRef.value,}

    validation: {

      rules: {/* Invalid inputs */

        email: { required: true }.formify-invalid {

      }  border-color: #ef4444 !important;

    }  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);

  });}

});

/* Slide down animation */

onUnmounted(() => {@keyframes slideDown {

  formify?.destroy();  from {

});    opacity: 0;

</script>    transform: translateY(-10px);

```  }

  to {

### Angular    opacity: 1;

    transform: translateY(0);

```typescript  }

import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';}

import { createFormify } from 'formease';```



@Component({### Custom Error Renderer

  selector: 'app-my-form',

  template: ````javascript

    <form #myForm>createFormify({

      <input type="email" name="email" />  form: '#myForm',

      <button type="submit">Submit</button>  errors: {

    </form>    customRenderer: (inputElement, errorMessage) => {

  `      // Create custom error UI

})      const errorDiv = document.createElement('div');

export class MyFormComponent implements OnInit, OnDestroy {      errorDiv.className = 'my-custom-error';

  @ViewChild('myForm') formElement!: ElementRef;      errorDiv.innerHTML = `<strong>⚠️</strong> ${errorMessage}`;

  private formify: any;      

      inputElement.parentElement.appendChild(errorDiv);

  ngOnInit() {    }

    this.formify = createFormify({  }

      form: this.formElement.nativeElement,});

      validation: {```

        rules: {

          email: { required: true }See complete styling example in [`demo/styles.css`](demo/styles.css).

        }

      }---

    });

  }## 📁 Project Structure



  ngOnDestroy() {```

    this.formify?.destroy();FormEase/

  }├── src/                      # TypeScript source code

}│   ├── index.ts             # Main entry & FormEase class

```│   ├── validate.ts          # Validation utilities

│   ├── autosave.ts          # Auto-save functionality

---│   ├── errors.ts            # Error handling

│   └── types.ts             # TypeScript definitions

## 🧪 Testing│

├── dist/                     # Built files (published to NPM)

FormEase includes comprehensive tests:│   ├── index.js             # CommonJS build

│   ├── index.esm.js         # ES Module build

```bash│   ├── FormEase.umd.js     # UMD build (browser)

# Run tests│   ├── FormEase.umd.min.js # UMD minified (24KB)

npm test│   └── *.d.ts               # TypeScript definitions

│

# Run tests in watch mode├── demo/                     # Interactive demo website

npm run test:watch│   ├── index.html           # Live demo with examples

│   ├── styles.css           # Demo styling

# Run tests with coverage│   └── demo.js              # Demo functionality

npm run test:coverage│

```├── examples/                 # Framework integration examples

│   ├── contact-form.html    # Vanilla JS example

**Test Coverage**: 53 passing tests covering validation, autosave, error handling, and integration.│   ├── react-example.tsx    # React integration

│   └── vue-example.vue      # Vue integration

---│

├── tests/                    # Jest test suites

## 📄 License│   ├── validation.test.ts   # Validation tests (16 tests)

│   ├── autosave.test.ts     # Auto-save tests (13 tests)

MIT License © [Piyush Raj Yadav](https://github.com/piyushrajyadav)│   ├── errors.test.ts       # Error handling tests (13 tests)

│   └── integration.test.ts  # Integration tests (11 tests)

---│

├── CHANGELOG.md              # Version history & releases

## 🤝 Contributing├── CONTRIBUTING.md           # Contribution guidelines

├── SECURITY.md               # Security policy

Contributions are welcome! Please feel free to submit a Pull Request.├── LICENSE                   # MIT License

├── package.json              # NPM package configuration

1. Fork the repository├── tsconfig.json             # TypeScript configuration

2. Create your feature branch (`git checkout -b feature/AmazingFeature`)├── rollup.config.js          # Build configuration

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)└── jest.config.cjs           # Test configuration

4. Push to the branch (`git push origin feature/AmazingFeature`)```

5. Open a Pull Request

---

---

## 🛠️ Development

## 📞 Support

### Setup Development Environment

- 🐛 **Issues**: [GitHub Issues](https://github.com/piyushrajyadav/formease/issues)

- 📧 **Email**: piyushyadavrajyadav@gmail.com```bash

- 💬 **Discussions**: [GitHub Discussions](https://github.com/piyushrajyadav/formease/discussions)# Clone repository

git clone https://github.com/piyushrajyadav/FormEase.git

---cd FormEase



## 🙏 Acknowledgments# Install dependencies

npm install

- Built with TypeScript

- Tested with Jest# Build library

- Bundled with Rollupnpm run build



---# Run tests

npm test

<div align="center">```



**Made with ❤️ by [Piyush  Yadav](https://github.com/piyushrajyadav)**### Available Scripts



⭐ Star this repo if you find it helpful!```bash

npm run build           # Build all formats (CJS, ESM, UMD)

</div>npm test                # Run all tests with Jest

npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
npm run lint            # Lint TypeScript code
npm run lint:fix        # Fix linting issues automatically
npm run format          # Format code with Prettier
npm run prepublishOnly  # Pre-publish checks (build + test)
```

### Project Configuration

- **TypeScript**: Strict mode, ES2020 target
- **Jest**: jsdom environment, ts-jest transformer
- **Rollup**: Multiple output formats, Terser minification
- **ESLint**: TypeScript rules + Prettier
- **Prettier**: Consistent code formatting

### Contributing

We welcome contributions! Please see [`CONTRIBUTING.md`](CONTRIBUTING.md) for:
- Code of conduct
- Development workflow
- Pull request process
- Coding standards

---

## 📊 Bundle Size

| Format | Size | Gzipped |
|--------|------|---------|
| UMD (minified) | 24KB | ~8KB |
| ES Module | 22KB | ~7KB |
| CommonJS | 23KB | ~7.5KB |

**Zero dependencies** = Smaller bundle size & better security!

---

## 🔒 Security

- ✅ **Zero dependencies** - Reduced attack surface
- ✅ **Input sanitization** - Prevents XSS attacks
- ✅ **No eval()** - Safe code execution
- ✅ **CSP compatible** - Works with Content Security Policy
- ✅ **Regular updates** - Security patches

**Report vulnerabilities:** See [`SECURITY.md`](SECURITY.md)

---

## 📝 License

**MIT License** © [Piyush Raj Yadav](https://github.com/piyushrajyadav)

Free to use in personal and commercial projects.

See [`LICENSE`](LICENSE) for full license text.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for detailed guidelines.

---

## 📮 Support & Contact

- 👤 **Author:** Piyush Raj Yadav
- 📧 **Email:** piyushyadavrajyadav@gmail.com
- 🐙 **GitHub:** [@piyushrajyadav](https://github.com/piyushrajyadav)
- 🐛 **Issues:** [Report bugs](https://github.com/piyushrajyadav/FormEase/issues)
- 💬 **Discussions:** [Ask questions](https://github.com/piyushrajyadav/FormEase/discussions)

---

## 🌟 Show Your Support

If you find this library helpful, please:
- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🔀 Submit pull requests

---

## 🙏 Acknowledgments

- Built with [TypeScript](https://www.typescriptlang.org/)
- Tested with [Jest](https://jestjs.io/)
- Bundled with [Rollup](https://rollupjs.org/)
- Inspired by modern form validation libraries

---

<div align="center">

**[⬆ Back to Top](#-FormEase)**

Made with ❤️ by [Piyush Raj Yadav](https://github.com/piyushrajyadav)

[![GitHub Stars](https://img.shields.io/github/stars/piyushrajyadav/FormEase?style=social)](https://github.com/piyushrajyadav/FormEase)
[![GitHub Forks](https://img.shields.io/github/forks/piyushrajyadav/FormEase?style=social)](https://github.com/piyushrajyadav/FormEase)

</div>
# formease
