import React, { useState } from 'react';

const QuizForm = ({ onGenerateQuiz, isLoading }) => {
  const [sourceLanguage, setSourceLanguage] = useState('Java');
  const [targetLanguage, setTargetLanguage] = useState('Python');
  const [difficulty, setDifficulty] = useState('Beginner');

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateQuiz(sourceLanguage, targetLanguage, difficulty);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="me-2">Source Language:</label>
        <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="me-2">Target Language:</label>
        <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
          <option value="Java">Java</option>
          <option value="Python">Python</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="me-2">Difficulty:</label>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary mb-3" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Quiz'}
      </button>
    </form>
  );
};

export default QuizForm;