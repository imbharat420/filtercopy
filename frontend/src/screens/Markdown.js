import React, { useState } from 'react';

const Markdown = ({ value, onChange }) => {
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const newValue = event.target.innerText;
    setError(null);
    onChange(newValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const p = document.createElement('p');
      range.insertNode(p);
      range.collapse(false);
      const newSpan = document.createElement('span');
      newSpan.contentEditable = true;
      p.appendChild(newSpan);
      newSpan.focus();
    }
  };

  // Autosuggest markdown tags when the user types '#' or '*'
  const handleInput = (event) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const text = range.startContainer.textContent;
    const position = range.startOffset;
    if (text[position - 1] === '#') {
      range.setStart(range.startContainer, position - 1);
      range.setEnd(range.startContainer, position + 1);
      range.deleteContents();
      const h1 = document.createElement('h1');
      h1.innerHTML = '#';
      h1.contentEditable = true;
      range.insertNode(h1);
      range.collapse(false);
      h1.focus();
    } else if (text[position - 1] === '*') {
      range.setStart(range.startContainer, position - 1);
      range.setEnd(range.startContainer, position + 1);
      range.deleteContents();
      const strong = document.createElement('strong');
      strong.innerHTML = '*';
      strong.contentEditable = true;
      range.insertNode(strong);
      range.collapse(false);
      strong.focus();
    }
  };

  return (
    <div>
      <p contentEditable={true} onInput={handleInput} onKeyDown={handleKeyDown} onBlur={handleChange} style={{width:"400px"}}>
        {value} Enter
      </p>
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default Markdown;
