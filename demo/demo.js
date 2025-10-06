// FormEase Demo - All Features
console.log('%c📋 FormEase Demo Loaded!', 'color: #6366f1; font-size: 16px; font-weight: bold');

let formify;

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('demoForm');
  const successMessage = document.getElementById('successMessage');
  
  // Initialize FormEase with ALL features
  formify = window.FormEase.createFormify({
    form: '#demoForm',
    
    // Validation Configuration
    validation: {
      rules: {
        fullName: { 
          required: true,
          minLength: 2,
          maxLength: 50
        },
        email: { 
          required: true 
        },
        phone: {
          required: false  // Optional field
        },
        website: {
          required: false  // Optional field
        },
        age: { 
          required: true,
          min: 18,
          max: 120
        },
        password: { 
          required: true,
          minLength: 8
        },
        message: {
          required: true,
          minLength: 10
        }
      },
      validateOnBlur: false,      // No validation while filling
      validateOnInput: false,      // No validation while typing
      validateOnSubmit: true       // Only validate on submit
    },
    
    // Auto-save Configuration
    autoSave: {
      enabled: true,
      storageKey: 'FormEase-demo',
      debounceDelay: 500,
      excludeFields: ['password']   // Don't save passwords!
    },
    
    // Error Handling Configuration
    errors: {
      showMultiple: true,
      errorClass: 'formify-error',
      invalidClass: 'formify-invalid',
      focusOnError: false,          // No auto-focus
      errorPosition: 'after'
    },
    
    // Success Callback
    onValidationSuccess: handleFormSubmit,
    
    // Error Callback
    onValidationError: handleValidationError,
    
    // Auto-save Callback
    onAutoSave: handleAutoSave
  });

  console.log('✅ FormEase initialized:', formify);
  
  // Update stats on input
  form.addEventListener('input', updateStats);
  
  // Initial stats update
  updateStats();
});

/**
 * Handle successful form submission
 */
function handleFormSubmit(formData) {
  console.log('✅ Form Valid! Data:', formData);
  
  // Show success message
  const successMessage = document.getElementById('successMessage');
  successMessage.classList.add('show');
  
  // Hide after 5 seconds
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, 5000);
  
  updateStats();
}

/**
 * Handle validation errors
 */
function handleValidationError(errors) {
  console.log('❌ Validation Errors:', errors);
  updateStats();
}

/**
 * Handle auto-save event
 */
function handleAutoSave(data) {
  console.log('💾 Auto-saved:', data);
  document.getElementById('savedStatus').textContent = 'Yes';
  document.getElementById('savedStatus').style.color = 'var(--success-color)';
}

/**
 * Update live statistics
 */
function updateStats() {
  const form = document.getElementById('demoForm');
  
  // Count filled fields
  let filledCount = 0;
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    if (input.value.trim() !== '' && input.type !== 'submit') {
      filledCount++;
    }
  });
  
  document.getElementById('filledCount').textContent = filledCount;
  
  // Count errors
  const errorElements = form.querySelectorAll('.formify-error');
  document.getElementById('errorCount').textContent = errorElements.length;
  
  // Check if auto-saved
  const savedData = localStorage.getItem('FormEase-demo');
  if (savedData) {
    document.getElementById('savedStatus').textContent = 'Yes';
    document.getElementById('savedStatus').style.color = 'var(--success-color)';
  } else {
    document.getElementById('savedStatus').textContent = 'No';
    document.getElementById('savedStatus').style.color = 'var(--error-color)';
  }
}

/**
 * Reset form and clear storage
 */
function resetForm() {
  if (formify) {
    formify.reset();
    localStorage.removeItem('FormEase-demo');
    console.log('🔄 Form reset and storage cleared');
  }
  
  // Reset stats
  document.getElementById('filledCount').textContent = '0';
  document.getElementById('errorCount').textContent = '0';
  document.getElementById('savedStatus').textContent = 'No';
  document.getElementById('savedStatus').style.color = 'var(--error-color)';
}

/**
 * Tab switching for installation section
 */
function showTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active from all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show selected tab
  const selectedTab = document.getElementById(`${tabName}-tab`);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Highlight selected button
  event.target.classList.add('active');
}

// Make formify available globally for console testing
window.formifyDemo = formify;

// Console helper
console.log(`
%c✨ FormEase Demo Ready!

%cTry these in console:
  • formifyDemo.validate()     - Validate form
  • formifyDemo.getFormData()  - Get form data
  • formifyDemo.reset()        - Reset form
  • formifyDemo.destroy()      - Destroy instance

%cDocumentation: https://github.com/piyushrajyadav/FormEase
`, 
'color: #6366f1; font-size: 18px; font-weight: bold',
'color: #4f46e5; font-size: 14px',
'color: #94a3b8; font-size: 12px'
);
