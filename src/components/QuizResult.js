import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

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
      const response = await axios.get(`${API_URL}/api/quiz/result/${quizId}`, {
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

  if (loading) return <div className="text-center">Loading result...</div>;
  
  if (error) return <div className="alert alert-danger">{error}</div>;
  
  if (noResult) return <div className="alert alert-info">No result available for this quiz.</div>;

  return result ? (
    <div className="card bg-light">
      <div className="card-body">
        <h5 className="card-title">Quiz Result</h5>
        <hr />
        <div className="mb-3">
          <h6>총점:</h6>
          <p className="font-weight-bold">{result.total_score}/100</p>
        </div>
        <hr />
        <div className="mb-3">
          <h6>세부 점수:</h6>
          <ul className="list-group">
            {Object.entries(result.score).map(([key, value]) => (
              value !== null && (
                <li key={key} className="list-group-item d-flex justify-content-between align-items-center">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <span className="badge bg-primary rounded-pill">{value}</span>
                </li>
              )
            ))}
          </ul>
        </div>
        <hr />
        <div className="mb-3">
          <h6>요약:</h6>
          <p>{result.summary}</p>
        </div>
        <hr />
        <div className="mb-3">
          <h6>상세 피드백:</h6>
          <ul className="list-group">
            {Object.entries(result.detailed_feedback).map(([key, value]) => (
              value !== null && (
                <li key={key} className="list-group-item">
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                </li>
              )
            ))}
          </ul>
        </div>
        <hr />
        <div className="mb-3">
          <h6>긍정적 피드백:</h6>
          <p>{result.positive_feedback}</p>
        </div>
        <hr />
        <div className="mb-3">
          <h6>제안사항:</h6>
          <ul className="list-group">
            {result.suggestions.map((suggestion, index) => (
              <li key={index} className="list-group-item">{suggestion}</li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="mb-3">
          <h6>모범 사례 코드:</h6>
          <pre className="bg-dark text-light p-2 rounded">{result.best_practice_code}</pre>
        </div>
        <hr />
        <div className="mb-3">
          <h6>모범 사례 설명:</h6>
          <p>{result.best_practice_explanation}</p>
        </div>
        {result.user_input_code && (
          <>
            <hr />
            <div className="mb-3">
              <h6>내가 했던 답변:</h6>
              <pre className="bg-dark text-light p-2 rounded">{result.user_input_code}</pre>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default QuizResult;