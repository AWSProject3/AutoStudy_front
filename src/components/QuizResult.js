import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizResult = ({ quizId }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noResult, setNoResult] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizResult();
  }, [quizId]);

  const fetchQuizResult = async () => {
    setLoading(true);
    setError(null);
    setNoResult(false);
    try {
      const response = await axios.get(`http://localhost:8000/api/quiz/result/${quizId}`, {
        withCredentials: true
      });
      if (response.data === null || response.data === undefined) {
        setNoResult(true);
      } else {
        setResult(response.data);
      }
    } catch (err) {
      console.error('Error fetching quiz result:', err);
      if (err.response && err.response.status === 401) {
        navigate('/');
      } else {
        setError('Failed to fetch quiz result. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading result...</div>;
  
  if (error) return <div className="alert alert-danger">{error}</div>;
  
  if (noResult) return <div className="alert alert-info">No result available for this quiz.</div>;

  return result ? (
    <div className="quiz-result">
      <h6>Quiz Result:</h6>
      <p><strong>Total Score:</strong> {result.total_score}</p>
      
      <h6>Detailed Scores:</h6>
      <ul>
        {Object.entries(result.score).map(([key, value]) => (
          value !== null && <li key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</li>
        ))}
      </ul>

      <h6>Summary:</h6>
      <p>{result.summary}</p>

      <h6>Detailed Feedback:</h6>
      <ul>
        {Object.entries(result.detailed_feedback).map(([key, value]) => (
          value !== null && <li key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</li>
        ))}
      </ul>

      <h6>Positive Feedback:</h6>
      <p>{result.positive_feedback}</p>

      <h6>Suggestions:</h6>
      <ul>
        {result.suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>

      <h6>Best Practice Code:</h6>
      <pre>{result.best_practice_code}</pre>

      <h6>Best Practice Explanation:</h6>
      <p>{result.best_practice_explanation}</p>

      {result.user_input_code && (
        <>
          <h6>Your Code:</h6>
          <pre>{result.user_input_code}</pre>
        </>
      )}
    </div>
  ) : null;
};

export default QuizResult;