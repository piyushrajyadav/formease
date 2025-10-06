# 📋 FormEase

<div align="center">

[![npm version](https://img.shields.io/npm/v/FormEase.svg)](https://www.npmjs.com/package/FormEase)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-53%20Passing-success.svg)](tests/)
[![Bundle Size](https://img.shields.io/badge/Size-8KB%20gzipped-success.svg)](dist/)

**A lightweight, intelligent form handling library with validation, autosave, and accessibility features.**

[Demo](demo/index.html) • [Examples](examples/) • [API Docs](#api-reference) • [Changelog](CHANGELOG.md)

</div>

---

## ✨ Features

- 🎯 **Smart Validation** - Automatic input type detection (email, URL, phone, password, etc.)
- 💾 **Auto-save** - Persist form data to localStorage with debouncing
- ♿ **Accessibility First** - Full ARIA support, screen-reader friendly
- 🎨 **Customizable** - Flexible styling and error handling
- 📦 **Lightweight** - Only ~8KB minified + gzipped, zero dependencies
- 🔧 **Framework Agnostic** - Works with vanilla JS, React, Vue, Angular
- 💪 **TypeScript** - Complete type definitions included
- 🧪 **Well Tested** - 53 passing tests, 100% coverage

---

## 📦 Installation

### NPM / Yarn
```bash
npm install FormEase
# or
yarn add FormEase
```

### CDN (Browser)
```html
<!-- Production (minified) -->
<script src="https://unpkg.com/FormEase@latest/dist/FormEase.umd.min.js"></script>

<!-- Development -->
<script src="https://unpkg.com/FormEase@latest/dist/FormEase.umd.js"></script>
```

### Module Formats
- **CommonJS**: `dist/index.js` (Node.js)
- **ES Module**: `dist/index.esm.js` (Webpack, Vite, Rollup)
- **UMD**: `dist/FormEase.umd.js` (Browser)
- **UMD Minified**: `dist/FormEase.umd.min.js` (Browser production)
- **TypeScript**: `dist/index.d.ts` (Type definitions)

---

## 🚀 Quick Start

### ES Module (Recommended)
```javascript
import { createFormify } from 'FormEase';

const formify = createFormify({
  form: '#myForm',
  validation: {
    rules: {
      email: { required: true },
      password: { required: true, minLength: 8 }
    },
    validateOnBlur: true
  },
  autoSave: {
    storageKey: 'my-form-data',
    debounceDelay: 500
  },
  onValidationSuccess: (data) => {
    console.log('Form submitted:', data);
  }
});
```

### Browser (UMD)
```html
<script src="https://unpkg.com/FormEase@latest/dist/FormEase.umd.min.js"></script>
<script>
  const formify = window.FormEase.createFormify({
    form: '#myForm',
    validation: {
      rules: {
        email: { required: true }
      }
    }
  });
</script>
```

### React
```jsx
import { createFormify } from 'FormEase';
import { useEffect, useRef } from 'react';

function MyForm() {
  const formRef = useRef(null);
  
  useEffect(() => {
    if (formRef.current) {
      const formify = createFormify({
        form: formRef.current,
        validation: { /* ... */ }
      });
      
      return () => formify.destroy();
    }
  }, []);
  
  return <form ref={formRef}>...</form>;
}
```

See more examples in the [`examples/`](examples/) folder.

---

## 📖 Configuration

### Full Configuration Options

```typescript
interface FormifyConfig {
  form: string | HTMLFormElement;  // Form selector or element
  
  validation?: {
    rules?: ValidationRules;        // Field validation rules
    validateOnBlur?: boolean;       // Validate on blur (default: true)
    validateOnInput?: boolean;      // Validate on input (default: false)
    validateOnSubmit?: boolean;     // Validate on submit (default: true)
    customValidators?: CustomValidatorMap;
  };
  
  autoSave?: {
    enabled?: boolean;              // Enable autosave (default: true)
    storageKey?: string;            // LocalStorage key (default: 'formify-data')
    debounceDelay?: number;         // Debounce delay in ms (default: 500)
    excludeFields?: string[];       // Fields to exclude (e.g., passwords)
  };
  
  errors?: {
    errorClass?: string;            // Error message class (default: 'formify-error')
    invalidClass?: string;          // Invalid input class (default: 'formify-invalid')
    focusOnError?: boolean;         // Focus first error (default: true)
    errorPosition?: 'before' | 'after' | 'custom';
    errorContainer?: string;        // Custom error container selector
    customRenderer?: (el: HTMLElement, msg: string) => void;
  };
  
  onValidationSuccess?: (data: FormData) => void;
  onValidationError?: (errors: ErrorMap) => void;
  onAutoSave?: (data: FormData) => void;
}
```

### Validation Rules

```javascript
{
  rules: {
    email: { 
      required: true,
      type: 'email'  // auto-detected if input type="email"
    },
    password: { 
      required: true,
      minLength: 8,
      maxLength: 50,
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/  // custom regex
    },
    age: {
      required: true,
      type: 'number',
      min: 18,
      max: 120
    },
    website: {
      required: false,
      type: 'url'
    },
    phone: {
      type: 'tel'  // validates phone numbers
    }
  }
}
```

### Custom Validators

```javascript
const formify = createFormify({
  form: '#myForm',
  validation: {
    rules: {
      username: { 
        required: true,
        custom: 'username'  // Use custom validator
      }
    },
    customValidators: {
      username: (value) => {
        if (value.length < 3) {
          return { isValid: false, message: 'Username too short' };
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return { isValid: false, message: 'Only letters, numbers, and underscores allowed' };
        }
        return { isValid: true };
      }
    }
  }
});
```

---

## 🧪 Testing

### Run Unit Tests (Jest)
```bash
# Run all tests
npm test

# Watch mode (auto re-run on changes)
npm run test:watch

# Coverage report
npm run test:coverage
```

**Test Results:**
- ✅ 53 tests passing
- ✅ 4 test suites (validation, autosave, errors, integration)
- ✅ 100% code coverage

### Test in Browser

#### Option 1: Open Demo Directly
```bash
# Windows
start demo/index.html

# macOS
open demo/index.html

# Linux
xdg-open demo/index.html
```

#### Option 2: Local Server (Recommended)
```bash
# Using npx (no installation needed)
npx serve demo
# Then open: http://localhost:3000

# Using Python
python -m http.server 8000
# Then open: http://localhost:8000/demo

# Using Node.js http-server
npx http-server -p 8000
# Then open: http://localhost:8000/demo
```

#### Option 3: VS Code Live Server
1. Install **"Live Server"** extension in VS Code
2. Right-click `demo/index.html`
3. Select **"Open with Live Server"**
4. Browser opens automatically

### Manual Browser Testing Checklist

Open `demo/index.html` and verify:

- ✅ **Validation**
  - Leave required fields empty and submit
  - Enter invalid email/URL/phone
  - Check error messages appear below fields
  - Verify inputs get red border

- ✅ **Auto-save**
  - Fill in form fields
  - Refresh page (Ctrl+R / Cmd+R)
  - Verify data is restored

- ✅ **Error Handling**
  - Check error messages have animations
  - Verify screen reader accessibility (use browser inspector)
  - Check ARIA attributes (`aria-invalid`, `aria-describedby`)

- ✅ **Accessibility**
  - Tab through form (keyboard navigation)
  - Verify focus indicators
  - Use screen reader (if available)

### Browser Compatibility

Tested and working in:
- ✅ Chrome/Edge 90+ (latest 2 versions)
- ✅ Firefox 88+ (latest 2 versions)
- ✅ Safari 14+ (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Internet Explorer 11 (with polyfills)

---

## 📋 API Reference

### Main API

#### `createFormify(config: FormifyConfig): FormifyInstance`
Creates a new FormEase instance.

```javascript
import { createFormify } from 'FormEase';
const formify = createFormify({ form: '#myForm' });
```

### FormifyInstance Methods

#### `validate(): ValidationResult`
Manually validate the entire form.

```javascript
const result = formify.validate();
if (result.isValid) {
  console.log('Form is valid!');
} else {
  console.log('Errors:', result.errors);
}
```

**Returns:**
```typescript
{
  isValid: boolean;
  errors: { [fieldName: string]: string };
}
```

#### `getFormData(): FormData`
Get current form data as a plain object.

```javascript
const data = formify.getFormData();
console.log(data);
// { email: 'test@example.com', password: '********', ... }
```

#### `reset(): void`
Reset the form to initial state and clear all errors.

```javascript
formify.reset();
```

#### `destroy(): void`
Clean up event listeners, clear storage, and remove instance.

```javascript
formify.destroy();
```

### Validation Utilities

Import individual validators for standalone use:

```javascript
import {
  validateEmail,
  validateUrl,
  validateTel,
  validatePassword,
  validateNumber,
  validateDate
} from 'FormEase';

// Validate email
const emailResult = validateEmail('test@example.com');
console.log(emailResult.isValid); // true

// Validate URL
const urlResult = validateUrl('https://example.com');

// Validate phone number
const phoneResult = validateTel('+1-234-567-8900');

// Validate password (min 8 chars)
const passResult = validatePassword('MyPass123', 8);

// Validate number with range
const numResult = validateNumber('25', 18, 120);

// Validate date
const dateResult = validateDate('2025-10-06');
```

---

## 🎨 Styling & Customization

### Default CSS Classes
- `.formify-error` - Error message element
- `.formify-invalid` - Invalid input element
- `.has-error` - Parent form-group with error (if exists)

### Custom Styling Example

```css
/* Error messages with animation */
.formify-error {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  padding: 8px 12px;
  background: rgba(239, 68, 68, 0.1);
  border-left: 3px solid #ef4444;
  border-radius: 4px;
  animation: slideDown 0.3s ease;
}

/* Invalid inputs */
.formify-invalid {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Slide down animation */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Custom Error Renderer

```javascript
createFormify({
  form: '#myForm',
  errors: {
    customRenderer: (inputElement, errorMessage) => {
      // Create custom error UI
      const errorDiv = document.createElement('div');
      errorDiv.className = 'my-custom-error';
      errorDiv.innerHTML = `<strong>⚠️</strong> ${errorMessage}`;
      
      inputElement.parentElement.appendChild(errorDiv);
    }
  }
});
```

See complete styling example in [`demo/styles.css`](demo/styles.css).

---

## 📁 Project Structure

```
FormEase/
├── src/                      # TypeScript source code
│   ├── index.ts             # Main entry & FormEase class
│   ├── validate.ts          # Validation utilities
│   ├── autosave.ts          # Auto-save functionality
│   ├── errors.ts            # Error handling
│   └── types.ts             # TypeScript definitions
│
├── dist/                     # Built files (published to NPM)
│   ├── index.js             # CommonJS build
│   ├── index.esm.js         # ES Module build
│   ├── FormEase.umd.js     # UMD build (browser)
│   ├── FormEase.umd.min.js # UMD minified (24KB)
│   └── *.d.ts               # TypeScript definitions
│
├── demo/                     # Interactive demo website
│   ├── index.html           # Live demo with examples
│   ├── styles.css           # Demo styling
│   └── demo.js              # Demo functionality
│
├── examples/                 # Framework integration examples
│   ├── contact-form.html    # Vanilla JS example
│   ├── react-example.tsx    # React integration
│   └── vue-example.vue      # Vue integration
│
├── tests/                    # Jest test suites
│   ├── validation.test.ts   # Validation tests (16 tests)
│   ├── autosave.test.ts     # Auto-save tests (13 tests)
│   ├── errors.test.ts       # Error handling tests (13 tests)
│   └── integration.test.ts  # Integration tests (11 tests)
│
├── CHANGELOG.md              # Version history & releases
├── CONTRIBUTING.md           # Contribution guidelines
├── SECURITY.md               # Security policy
├── LICENSE                   # MIT License
├── package.json              # NPM package configuration
├── tsconfig.json             # TypeScript configuration
├── rollup.config.js          # Build configuration
└── jest.config.cjs           # Test configuration
```

---

## 🛠️ Development

### Setup Development Environment

```bash
# Clone repository
git clone https://github.com/piyushrajyadav/FormEase.git
cd FormEase

# Install dependencies
npm install

# Build library
npm run build

# Run tests
npm test
```

### Available Scripts

```bash
npm run build           # Build all formats (CJS, ESM, UMD)
npm test                # Run all tests with Jest
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
