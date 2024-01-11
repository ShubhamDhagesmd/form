import React from 'react';



const FormField = ({ index, field, onRemove, onChange, onOptionsChange }) => {
    const handleInputChange = (e) => {
    onChange(index, 'label', e.target.value);
  };

  const handleSelectChange = (e) => {
    const selectedType = e.target.value;
    const updatedLabel = selectedType === 'dropdown' ? '' : field.label;

    onChange(index, 'label', updatedLabel);
    onChange(index, 'type', selectedType);

    onOptionsChange(index, []);
    
    
  };

  const handleOptionsChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    onOptionsChange(index, options);
  };
  const shouldShowFieldLabel = () => {
    return field.type !== 'checkbox' && field.type !== 'radio';
  };
  

  return (
    <div>
      <label>
        Field Type:
        <select value={field.type} onChange={handleSelectChange}>
          <option value="text">Text Input</option>
          <option value="textarea">Text Area</option>
          <option value="dropdown">Dropdown</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio Button</option>
        </select>
      </label>
      
      { shouldShowFieldLabel() &&  field.type !== 'dropdown' && (
        <label>
          Field Label:
          <input type="text" value={field.label} onChange={handleInputChange} disabled={field.type === 'checkbox' || field.type === 'radio'} />
        </label>
      )}
      {field.type === 'dropdown' && (
        <label>
          Options:
          <select multiple value={field.options} onChange={handleOptionsChange}>
            <option value="Option 1">HSC</option>
            <option value="Option 2">Diploma</option>
            <option value="Option 3">UG</option>
            <option value="Option 4">PG</option>
          </select>
        </label>
      )}
        
        
      {field.type === 'checkbox' && (
        <>
          <label>
            1:
            <input
              type="checkbox"
              checked={field.options.includes('Checkbox 1')}
              onChange={() => onOptionsChange(index, ['Checkbox 1'])}
            />
          </label>
          <label>
            2:
            <input
              type="checkbox"
              checked={field.options.includes('Checkbox 2')}
              onChange={() => onOptionsChange(index, ['Checkbox 2'])}
            />
          </label>
          <label>
            3:
            <input
              type="checkbox"
              checked={field.options.includes('Checkbox 3')}
              onChange={() => onOptionsChange(index, ['Checkbox 3'])}
            />
          </label>
          <label>
            4:
            <input
              type="checkbox"
              checked={field.options.includes('Checkbox 4')}
              onChange={() => onOptionsChange(index, ['Checkbox 4'])}
            />
          </label>
        </>
      )}
      {field.type === 'radio' && (
        <>
          <label>
            1:
            <input
              type="radio"
              name={`options_radio_${index}`}
              checked={field.options.includes('Radio 1')}
              onChange={() => onOptionsChange(index, ['Radio 1'])}
            />
          </label>
          <label>
            2:
            <input
              type="radio"
              name={`options_radio_${index}`}
              checked={field.options.includes('Radio 2')}
              onChange={() => onOptionsChange(index, ['Radio 2'])}
            />
          </label>
          <label>
            3:
            <input
              type="radio"
              name={`options_radio_${index}`}
              checked={field.options.includes('Radio 3')}
              onChange={() => onOptionsChange(index, ['Radio 3'])}
            />
          </label>
          <label>
            4:
            <input
              type="radio"
              name={`options_radio_${index}`}
              checked={field.options.includes('Radio 4')}
              onChange={() => onOptionsChange(index, ['Radio 4'])}
            />
          </label>
        </>
      )}
      <button type="button" onClick={() => onRemove(index)}>
      {/* <FontAwesomeIcon icon={faTimes} /> */}
      &#x1F5D1; 


      </button>
    </div>
  );
};

export default FormField;

