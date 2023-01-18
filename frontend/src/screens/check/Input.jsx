import React, { useState } from "react";

const Input = ({
  value,
  onChange,
  minLength,
  maxLength,
  required,
  pattern,
  title,
}) => {
  const [error, setError] = useState(null);

  const handleChange = event => {
    const newValue = event.target.innerText;
    setError(null);
    onChange(newValue);
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const br = document.createElement("br");
      range.insertNode(br);
      range.collapse(false);
      const newSpan = document.createElement("span");
      newSpan.contentEditable = true;
      br.parentNode.insertBefore(newSpan, br.nextSibling);
      newSpan.focus();
    }
  };

  const validate = () => {
    let errorMessage;

    if (required && !value) {
      errorMessage = "This field is required";
    } else if (minLength && value.length < minLength) {
      errorMessage = `This field must be at least ${minLength} characters`;
    } else if (maxLength && value.length > maxLength) {
      errorMessage = `This field must be no more than ${maxLength} characters`;
    } else if (pattern && !pattern.test(value)) {
      errorMessage = "This field does not match the required format";
    }

    setError(errorMessage);
    return !errorMessage;
  };

  return (
    <div>
      <p
        contentEditable={true}
        onInput={handleChange}
        onKeyDown={handleKeyDown}
        required={required}
        style={{width:"400px"}}
      >
        {value}
      </p>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Input;
