// DynamicForm.js
import React, { useState } from 'react';
import FormField from './FormField';

import './App.css';

const DynamicForm = () => {
  const [formFields, setFormFields] = useState([]);
  const [error, setErrors] = useState([]);


  const addFormField = () => {
    setFormFields([...formFields, { label: '', type: 'text', options: [] }]);
  };

  const removeFormField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleFieldChange = (index, property, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][property] = value;

    if (property === 'type' && value === 'dropdown') {
      updatedFields[index].options = ['Option 1', 'Option 2', 'Option 3'];
      updatedFields[index].label = ''; // Clear the label for dropdown
    }

    setFormFields(updatedFields);
  };

  const handleOptionsChange = (index, options) => {
    const updatedFields = [...formFields];
    updatedFields[index].options = options;
    setFormFields(updatedFields);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission and validation here
    const isValid = validateForm();
    
    if (isValid) {
      console.log('Form submitted:', formFields);
      // Reset errors on successful submission
      setErrors([]);
      alert('Form Submitted Sucessfully.')
    } else {
      console.log('Form validation failed');
      alert('Invalid Input')
    }
    console.log('Form data:', formFields);
  };
  const validateForm = () => {
    const validationErrors = formFields.map((field, index) => {
      if (field.label.trim() === '') {
        return `Field ${index + 1} must have a label.`;
      }
      return null;
    });

    // Filter out null values (validations passed) and update state
    const filteredErrors = validationErrors.filter((error) => error !== null);
    setErrors(filteredErrors);

    // Return true if there are no errors
    return filteredErrors.length === 0;
  };

  const saveConfig = () => {
    const configToSave = JSON.stringify(formFields);
    const blob = new Blob([configToSave], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'formConfig.json';
    link.click();
  };

  const loadConfig = (event) => {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const configData = JSON.parse(e.target.result);
        setFormFields(configData);
      };
      
        if (file) {
        // Validate file type (accept only .json files)
        if (!file.name.endsWith('.json')) {
          alert('Invalid file type. Please select a JSON file.');
          fileInput.value = ''; // Clear the input to allow reselection
          return;
        }
    // Validate file size (set your desired maximum file size in bytes)
    const maxSizeInBytes = 1024 * 1024; // 1 MB
    if (file.size > maxSizeInBytes) {
      alert('File size exceeds the allowed limit (1 MB). Please select a smaller file.');
      fileInput.value = ''; // Clear the input to allow reselection
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const configData = JSON.parse(e.target.result);
        setFormFields(configData);
      } catch (error) {
        alert('Error parsing JSON file. Please select a valid JSON file.');
        fileInput.value = ''; // Clear the input to allow reselection
      }
    };
      reader.readAsText(file);
    }
  }
};

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <FormField
            key={index}
            index={index}
            field={field}
            onRemove={removeFormField}
            onChange={handleFieldChange}
            onOptionsChange={handleOptionsChange}
          />
        ))}
        <button type="button" onClick={addFormField}>Add Field</button>
        <button type="submit">Submit Form</button>
        <button type="button" onClick={saveConfig}>Save Form Configuration</button>
        <input type="file" accept=".json" onChange={loadConfig} />
      </form>
    </div>
  );
};

export default DynamicForm;
