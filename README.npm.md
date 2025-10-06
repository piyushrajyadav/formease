# @piyushrajyadav/formease

<div align="center">

[![npm version](https://img.shields.io/npm/v/@piyushrajyadav/formease.svg)](https://www.npmjs.com/package/@piyushrajyadav/formease)
[![npm downloads](https://img.shields.io/npm/dm/@piyushrajyadav/formease.svg)](https://www.npmjs.com/package/@piyushrajyadav/formease)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@piyushrajyadav/formease)](https://bundlephobia.com/package/@piyushrajyadav/formease)

**Intelligent form handling with validation, autosave, and accessibility features.**

[📖 Documentation](https://github.com/piyushrajyadav/formease#readme) • [🚀 Demo](https://github.com/piyushrajyadav/formease/blob/main/demo/index.html) • [📝 Changelog](https://github.com/piyushrajyadav/formease/blob/main/CHANGELOG.md)

</div>

## Why FormEase?

FormEase automatically handles form validation, data persistence, and accessibility without configuration. Just add it to your form and it works.

```javascript
import FormEase from '@piyushrajyadav/formease';

// That's it! Auto-detects validation rules and handles everything
new FormEase('#my-form');
```

## Installation

```bash
npm install @piyushrajyadav/formease
```

```bash
yarn add @piyushrajyadav/formease
```

```bash
pnpm add @piyushrajyadav/formease
```

### CDN

```html
<script src="https://unpkg.com/@piyushrajyadav/formease@latest/dist/formease.umd.min.js"></script>
```

## Quick Start

### Basic Usage

```javascript
import FormEase from '@piyushrajyadav/formease';

const form = new FormEase('#contact-form', {
  autosave: true,
  validation: {
    email: [{ type: 'email', message: 'Invalid email' }],
    name: [{ type: 'required', message: 'Name required' }]
  }
});
```

### HTML

```html
<form id="contact-form">
  <input name="name" type="text" placeholder="Your name" required>
  <input name="email" type="email" placeholder="Your email" required>
  <button type="submit">Submit</button>
</form>
```

## Key Features

| Feature | Description |
|---------|-------------|
| 🎯 **Smart Validation** | Auto-detects input types (email, URL, phone, password, number, date) |
| 💾 **Auto-Save** | Persist form data to localStorage with debouncing |
| ♿ **Accessibility** | Full ARIA support, screen-reader announcements |
| 🎨 **Customizable** | Flexible styling, error positioning, custom validators |
| 📦 **Zero Dependencies** | Lightweight with no external dependencies |
| 🔧 **Framework Agnostic** | Works with Vanilla JS, React, Vue, Angular |
| 💪 **TypeScript** | Complete type definitions included |

## API Reference

### Constructor

```typescript
new FormEase(selector: string | HTMLFormElement, options?: FormEaseOptions)
```

### Methods

```typescript
// Validate form manually
form.validate(): boolean

// Get form data
form.getData(): FormData

// Set form data
form.setData(data: Record<string, any>): void

// Reset form
form.reset(): void

// Destroy instance
form.destroy(): void
```

### Configuration Options

```typescript
interface FormEaseOptions {
  validation?: ValidationRules;
  autosave?: {
    enabled: boolean;
    interval: number;
    key: string;
  };
  accessibility?: {
    enabled: boolean;
    announceErrors: boolean;
  };
  onSubmit?: (data: FormData) => void;
  onValidationChange?: (isValid: boolean, errors: ValidationErrors) => void;
}
```

## Validation Rules

| Rule | Description | Example |
|------|-------------|---------|
| `required` | Field must have value | `{ type: 'required' }` |
| `email` | Valid email format | `{ type: 'email' }` |
| `url` | Valid URL format | `{ type: 'url' }` |
| `minLength` | Minimum character length | `{ type: 'minLength', value: 5 }` |
| `maxLength` | Maximum character length | `{ type: 'maxLength', value: 100 }` |
| `min` | Minimum numeric value | `{ type: 'min', value: 18 }` |
| `max` | Maximum numeric value | `{ type: 'max', value: 65 }` |
| `pattern` | Custom regex pattern | `{ type: 'pattern', value: /^\d+$/ }` |

## Framework Integration

### React

```jsx
import { useEffect, useRef } from 'react';
import FormEase from '@piyushrajyadav/formease';

function ContactForm() {
  const formRef = useRef(null);

  useEffect(() => {
    const formease = new FormEase(formRef.current, {
      onSubmit: (data) => console.log('Submit:', data)
    });
    
    return () => formease.destroy();
  }, []);

  return <form ref={formRef}>{/* form fields */}</form>;
}
```

### Vue

```vue
<template>
  <form ref="form">
    <!-- form fields -->
  </form>
</template>

<script>
import FormEase from '@piyushrajyadav/formease';

export default {
  mounted() {
    this.formease = new FormEase(this.$refs.form);
  },
  beforeUnmount() {
    this.formease?.destroy();
  }
}
</script>
```

### Angular

```typescript
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import FormEase from '@piyushrajyadav/formease';

@Component({
  template: '<form #form><!-- form fields --></form>'
})
export class ContactComponent implements AfterViewInit {
  @ViewChild('form') formRef!: ElementRef;
  private formease!: FormEase;

  ngAfterViewInit() {
    this.formease = new FormEase(this.formRef.nativeElement);
  }

  ngOnDestroy() {
    this.formease?.destroy();
  }
}
```

## Advanced Examples

### Custom Validation

```javascript
const form = new FormEase('#form', {
  validation: {
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'minLength', value: 3, message: 'At least 3 characters' },
      { 
        type: 'custom', 
        validator: (value) => !value.includes(' '),
        message: 'No spaces allowed'
      }
    ]
  }
});
```

### Auto-save Configuration

```javascript
const form = new FormEase('#form', {
  autosave: {
    enabled: true,
    interval: 2000, // Save every 2 seconds
    key: 'contact-form-data' // localStorage key
  }
});
```

### Event Handling

```javascript
const form = new FormEase('#form', {
  onSubmit: (data) => {
    // Handle form submission
    fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
  },
  onValidationChange: (isValid, errors) => {
    console.log('Form valid:', isValid);
    console.log('Errors:', errors);
  },
  onSave: (data) => {
    console.log('Data saved to localStorage:', data);
  }
});
```

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | ≥ 60 |
| Firefox | ≥ 55 |
| Safari | ≥ 12 |
| Edge | ≥ 79 |

## TypeScript Support

FormEase includes complete TypeScript definitions:

```typescript
import FormEase, { FormEaseOptions, ValidationRule } from '@piyushrajyadav/formease';

const options: FormEaseOptions = {
  validation: {
    email: [{ type: 'email', message: 'Invalid email address' }]
  }
};

const form = new FormEase('#form', options);
```

## Bundle Information

- **Package size**: ~12KB minified + gzipped
- **Unpacked size**: 396KB
- **Dependencies**: Zero
- **Tree-shakable**: Yes (ES modules)

## Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/piyushrajyadav/formease/blob/main/CONTRIBUTING.md).

## License

MIT © [Piyush Yadav](https://github.com/piyushrajyadav)

## Support

- 📝 [Documentation](https://github.com/piyushrajyadav/formease#readme)
- 🐛 [Report Issues](https://github.com/piyushrajyadav/formease/issues)
- 📧 [Email](mailto:piyushyadavrajyadav@gmail.com)

---

<div align="center">

**Made with ❤️ by [Piyush  Yadav](https://github.com/piyushrajyadav)**

[⭐ Star on GitHub](https://github.com/piyushrajyadav/formease) • [📦 View on NPM](https://www.npmjs.com/package/@piyushrajyadav/formease)

</div>