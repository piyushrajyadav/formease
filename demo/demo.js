/**
 * FormEase Demo - Interactive Functionality
 * Modern library website demo with live statistics and form integration
 */

console.log('Demo.js loaded!');
console.log('Window FormEase available:', typeof window.FormEase);

class FormEaseDemo {
  constructor() {
    this.form = null;
    this.formEase = null;
    this.stats = {
      validationCount: 0,
      saveCount: 0,
      fieldCount: 0,
      errorCount: 0
    };
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready and FormEase to be loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.waitForFormEase());
    } else {
      this.waitForFormEase();
    }
  }

  waitForFormEase() {
    // Check if FormEase is already available
    if (window.FormEase) {
      console.log('FormEase already available');
      this.setupDemo();
      return;
    }

    // Wait for FormEase to load (up to 5 seconds)
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds with 100ms intervals
    
    const checkFormEase = () => {
      attempts++;
      if (window.FormEase) {
        console.log('FormEase loaded after', attempts * 100, 'ms');
        this.setupDemo();
      } else if (attempts < maxAttempts) {
        setTimeout(checkFormEase, 100);
      } else {
        console.error('FormEase failed to load after 5 seconds');
        this.setupDemo(); // Setup demo anyway for fallback functionality
      }
    };
    
    checkFormEase();
  }

  setupDemo() {
    // Debug: Check what FormEase objects are available
    console.log('window.FormEase:', window.FormEase);
    console.log('FormEase keys:', window.FormEase ? Object.keys(window.FormEase) : 'undefined');
    
    this.setupTabs();
    this.setupForm();
    this.updateStats();
    this.setupCopyButtons();
    this.setupScrollEffects();
    this.setupFeatureAnimations();
  }

  // Tab functionality for install methods and documentation
  setupTabs() {
    // Install tabs
    const installTabs = document.querySelectorAll('.tab-btn');
    const installPanels = document.querySelectorAll('.tab-panel');

    installTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and panels
        installTabs.forEach(t => t.classList.remove('active'));
        installPanels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        installPanels[index].classList.add('active');
      });
    });

    // Documentation tabs
    const docsTabs = document.querySelectorAll('.docs-tab');
    const docsPanels = document.querySelectorAll('.docs-panel');

    docsTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs and panels
        docsTabs.forEach(t => t.classList.remove('active'));
        docsPanels.forEach(p => p.classList.remove('active'));

        // Add active class to clicked tab and corresponding panel
        tab.classList.add('active');
        docsPanels[index].classList.add('active');
      });
    });
  }

  // Setup the interactive demo form
  setupForm() {
    this.form = document.getElementById('demoForm');
    if (!this.form) return;

    console.log('Setting up form with element:', this.form);
    
    // Initialize FormEase if available
    if (window.FormEase && typeof window.FormEase.FormEase === 'function') {
      console.log('Found FormEase.FormEase constructor, initializing...');
      this.formEase = new window.FormEase.FormEase({
        form: this.form,
        validation: {
          validateOnInput: true,
          validateOnBlur: true,
          showErrorsImmediately: true,
          rules: {
            firstName: {
              required: true,
              minLength: 2,
              errorMessage: 'First name is required (min 2 characters)'
            },
            lastName: {
              required: true,
              minLength: 2,
              errorMessage: 'Last name is required (min 2 characters)'
            },
            email: {
              required: true,
              type: 'email',
              errorMessage: 'Please enter a valid email address'
            },
            phone: {
              pattern: /^[\+]?[1-9][\d]{0,15}$/,
              errorMessage: 'Please enter a valid phone number'
            },
            age: {
              required: true,
              type: 'number',
              min: 13,
              max: 120,
              errorMessage: 'Age must be between 13 and 120'
            },
            website: {
              type: 'url',
              errorMessage: 'Please enter a valid URL'
            },
            message: {
              required: true,
              minLength: 10,
              errorMessage: 'Message must be at least 10 characters'
            },
            terms: {
              required: true,
              errorMessage: 'You must accept the terms and conditions'
            }
          }
        },
        autoSave: {
          storageKey: 'formease-demo-data',
          debounceDelay: 2000,
          onSave: (data) => {
            this.stats.saveCount++;
            this.updateStats();
            console.log('Form data saved:', data);
          }
        },
        onValidationSuccess: (data) => {
          this.stats.validationCount++;
          this.stats.errorCount = 0;
          this.updateStats();
          this.updateFormStatus(true, {});
          this.handleFormSubmit(data);
        },
        onValidationError: (errors) => {
          this.stats.validationCount++;
          this.stats.errorCount = Object.keys(errors).length;
          this.updateStats();
          this.updateFormStatus(false, errors);
        }
      });
      console.log('FormEase initialized successfully:', this.formEase);
    } else {
      // Fallback for when FormEase is not loaded
      console.warn('FormEase library not loaded or not found');
      console.log('Available on window.FormEase:', window.FormEase);
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('FormEase library not loaded. This is a demo showing the integration.');
      });
    }

    // Add input listeners for demo purposes (fallback)
    if (!this.formEase) {
      const inputs = this.form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          this.stats.validationCount++;
          this.updateStats();
        });
      });
    }

    // Update field count
    this.stats.fieldCount = this.form.querySelectorAll('input, textarea, select').length;
  }

  // Handle form submission
  handleFormSubmit(data) {
    // Show success message
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success';
    alertDiv.innerHTML = `
      <strong>Success!</strong> Form submitted successfully. Check the console for form data.
    `;
    
    this.form.insertBefore(alertDiv, this.form.firstChild);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
      alertDiv.remove();
    }, 5000);

    console.log('Form submitted with data:', data);
  }

  // Update form status indicator
  updateFormStatus(isValid, errors) {
    const statusElement = document.querySelector('.demo-status');
    if (!statusElement) return;

    if (isValid) {
      statusElement.textContent = '✓ Valid';
      statusElement.style.background = 'var(--success)';
    } else {
      const errorCount = Object.keys(errors).length;
      statusElement.textContent = `${errorCount} Error${errorCount !== 1 ? 's' : ''}`;
      statusElement.style.background = 'var(--error)';
    }
  }

  // Update live statistics
  updateStats() {
    const updateStat = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) {
        element.textContent = value.toLocaleString();
      }
    };

    updateStat('#stat-validation', this.stats.validationCount);
    updateStat('#stat-saves', this.stats.saveCount);
    updateStat('#stat-fields', this.stats.fieldCount);
    updateStat('#stat-errors', this.stats.errorCount);

    // Update hero stats
    updateStat('.hero-stats .stat-number', this.stats.validationCount + 1000); // Add base number for demo
  }

  // Setup copy-to-clipboard functionality
  setupCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      const button = document.createElement('button');
      button.className = 'copy-btn';
      button.innerHTML = '📋 Copy';
      button.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: var(--primary);
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        opacity: 0;
        transition: opacity 0.2s;
      `;

      pre.style.position = 'relative';
      pre.appendChild(button);

      pre.addEventListener('mouseenter', () => {
        button.style.opacity = '1';
      });

      pre.addEventListener('mouseleave', () => {
        button.style.opacity = '0';
      });

      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(codeBlock.textContent);
          button.innerHTML = '✓ Copied!';
          setTimeout(() => {
            button.innerHTML = '📋 Copy';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
          button.innerHTML = '❌ Failed';
          setTimeout(() => {
            button.innerHTML = '📋 Copy';
          }, 2000);
        }
      });
    });
  }

  // Setup scroll effects
  setupScrollEffects() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = 'var(--shadow-md)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
      }

      lastScrollY = currentScrollY;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Setup feature animations
  setupFeatureAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
      observer.observe(card);
    });

    // Observe example cards
    document.querySelectorAll('.example-card').forEach(card => {
      observer.observe(card);
    });
  }

  // Utility method to simulate real-time updates
  startRealtimeUpdates() {
    setInterval(() => {
      // Simulate some background activity
      if (Math.random() > 0.7) {
        this.stats.validationCount += Math.floor(Math.random() * 3) + 1;
        this.updateStats();
      }
    }, 10000); // Update every 10 seconds
  }
}

// Additional utility functions
const utils = {
  // Format numbers for display
  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  },

  // Debounce function for performance
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Generate random demo data
  generateDemoData() {
    const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah', 'David', 'Lisa'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;

    return {
      firstName,
      lastName,
      email,
      phone: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      age: Math.floor(Math.random() * 50) + 18,
      website: `https://${firstName.toLowerCase()}${lastName.toLowerCase()}.com`,
      message: `Hello! I'm interested in learning more about FormEase. It looks like a great solution for form handling.`
    };
  }
};

// Initialize demo when script loads
const demoInstance = new FormEaseDemo();

// Add global demo functions
window.FormEaseDemo = {
  // Fill form with demo data
  fillDemoData() {
    const form = document.getElementById('demoForm');
    if (!form) return;

    const demoData = utils.generateDemoData();
    
    Object.keys(demoData).forEach(key => {
      const field = form.querySelector(`[name="${key}"]`);
      if (field) {
        field.value = demoData[key];
        field.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });

    // Check terms checkbox
    const termsCheckbox = form.querySelector('[name="terms"]');
    if (termsCheckbox) {
      termsCheckbox.checked = true;
      termsCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
    }
  },

  // Clear form data
  clearForm() {
    const form = document.getElementById('demoForm');
    if (!form) return;

    form.reset();
    
    // Trigger validation if FormEase is loaded
    if (demoInstance.formEase) {
      demoInstance.formEase.validate();
    }
  },

  // Export form data as JSON
  exportFormData() {
    const form = document.getElementById('demoForm');
    if (!form) return;

    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    const jsonData = JSON.stringify(data, null, 2);
    
    // Create download link
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formease-demo-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  // Show FormEase configuration
  showConfig() {
    if (!demoInstance.formEase) {
      alert('FormEase not initialized');
      return;
    }

    // Show basic info since getConfig() method doesn't exist in current API
    const info = {
      hasFormEase: !!demoInstance.formEase,
      formElement: demoInstance.form ? demoInstance.form.id : 'unknown',
      fieldCount: demoInstance.stats.fieldCount,
      validationCount: demoInstance.stats.validationCount,
      saveCount: demoInstance.stats.saveCount
    };
    
    console.log('FormEase Demo Info:', info);
    alert(`FormEase Demo Info:\n\n${JSON.stringify(info, null, 2)}`);
  }
};

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K to focus search (if implemented)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    // Focus search input if available
    const searchInput = document.querySelector('#search');
    if (searchInput) {
      searchInput.focus();
    }
  }

  // Escape to close modals (if implemented)
  if (e.key === 'Escape') {
    // Close any open modals
    document.querySelectorAll('.modal.active').forEach(modal => {
      modal.classList.remove('active');
    });
  }
});

// Performance monitoring
if (typeof performance !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.timing;
      const loadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`FormEase Demo loaded in ${loadTime}ms`);
    }, 0);
  });
}

// Error handling
window.addEventListener('error', (e) => {
  console.error('FormEase Demo Error:', e.error);
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { FormEaseDemo, utils };
}