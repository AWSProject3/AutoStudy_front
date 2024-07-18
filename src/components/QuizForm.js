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
    <div className="card shadow-sm bg-light text-dark">
      <div className="card-body">
        <h5 className="card-title mb-4">Generate Quiz</h5>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="sourceLanguage" className="form-label">Source Language</label>
              <select 
                id="sourceLanguage"
                className="form-select" 
                value={sourceLanguage} 
                onChange={(e) => setSourceLanguage(e.target.value)}
              >
                <option value="Java">Java</option>
                <option value="Python">Python</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="targetLanguage" className="form-label">Target Language</label>
              <select 
                id="targetLanguage"
                className="form-select" 
                value={targetLanguage} 
                onChange={(e) => setTargetLanguage(e.target.value)}
              >
                <option value="Java">Java</option>
                <option value="Python">Python</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="difficulty" className="form-label">Difficulty</label>
              <select 
                id="difficulty"
                className="form-select" 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button type="submit" className="btn btn-info w-100" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Generating...
                </>
              ) : 'Generate Quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;