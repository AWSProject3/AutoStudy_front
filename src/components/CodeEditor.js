import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange }) => {
  const options = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };

  const handleEditorChange = (value, event) => {
    onChange(value);
  };

  return (
    <Editor
      height="300px"
      language={language}
      theme="vs-dark"
      value={value}
      options={options}
      onChange={handleEditorChange}
    />
  );
};

export default CodeEditor;