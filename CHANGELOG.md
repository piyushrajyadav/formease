# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-06

### Added
- Initial release of FormEase
- Smart validation with automatic input type detection
- Built-in validators for email, URL, phone, password, number, and date
- Custom validation rules support
- Auto-save functionality with localStorage
- Configurable debouncing for auto-save
- Comprehensive error handling with accessibility features
- ARIA attributes for screen readers
- Customizable error messages and styling
- TypeScript support with full type definitions
- Modular architecture (validate, autosave, errors)
- Framework-agnostic design (works with React, Vue, Angular, vanilla JS)
- Jest test suite with high coverage
- Comprehensive documentation and examples
- Demo page
- MIT License

### Features
- **Validation Module**
  - Automatic input type detection
  - Built-in validators for common types
  - Custom validation functions
  - Pattern matching with RegEx
  - Min/max length validation
  - Min/max value validation for numbers
  - Required field validation
  
- **AutoSave Module**
  - Automatic form data persistence to localStorage
  - Configurable debounce delay
  - Exclude specific fields (e.g., passwords)
  - Clear storage on form submit
  - Manual save/restore/clear methods
  - Callbacks for save and restore events

- **Error Handling Module**
  - Display error messages near inputs
  - Customizable error classes
  - Focus on first invalid field
  - Accessible error messages with ARIA
  - Custom error rendering support
  - Multiple error display at once
  - Individual error show/hide methods

- **Main FormEase Class**
  - Unified API for all features
  - Event-based validation (blur, input)
  - Form submission handling
  - Success and error callbacks
  - Get form data programmatically
  - Reset form functionality
  - Clean destroy method

### Documentation
- Comprehensive README with examples
- API reference documentation
- Usage examples for vanilla JS and frameworks
- Code samples for common use cases
- Contributing guidelines
- MIT License

### Developer Experience
- Full TypeScript support
- ESLint configuration
- Prettier formatting
- Jest testing setup
- Rollup bundling
- Source maps
- Type definitions
- NPM scripts for common tasks

## [Unreleased]

### Planned Features
- File upload validation
- Async validation support
- More built-in validators
- Internationalization (i18n) support
- Custom storage adapters (IndexedDB, SessionStorage)
- Form field masking
- Conditional validation rules
- Validation groups
- Progress indicators for multi-step forms
- Rich error messages with HTML support
