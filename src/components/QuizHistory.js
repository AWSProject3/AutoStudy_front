import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizResult from './QuizResult'; 
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const QuizCard = ({ quiz, id }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const preStyle = {
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    overflow: 'auto',
    maxHeight: '300px'
  };

  return (
    <div className="card mb-3 bg-light text-dark">
      <div className="card-body">
        <h5 className="card-title">문제 #{id}</h5>
        <pre className="bg-dark text-light p-2 rounded" style={preStyle}>{quiz.quiz}</pre>
        <p className="card-text"><strong>난이도:</strong> {quiz.difficulty}</p>
        <div className="d-flex justify-content-start align-items-center mb-3">
          <button 
            className="btn btn-outline-info me-2" 
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          <button 
            className="btn btn-outline-success" 
            onClick={() => setShowResult(!showResult)}
          >
            {showResult ? 'Hide Result' : 'Show Result'}
          </button>
        </div>
        
        {showDetails && (
          <div className="mt-3">
            <hr />
            <p><strong>Source Language:</strong> {quiz.source_language}</p>
            <p><strong>Target Language:</strong> {quiz.target_language}</p>
            <p><strong>Category:</strong> {quiz.category.type} - {quiz.category.detail}</p>
            <hr />
            <h6>Hint:</h6>
            <p>{quiz.hint.describe}</p>
            <pre className="bg-dark text-light p-2 rounded" style={preStyle}>{quiz.hint.source_language_code}</pre>
            <hr />
            <h6>Answer:</h6>
            <pre className="bg-dark text-light p-2 rounded" style={preStyle}>{quiz.answer}</pre>
          </div>
        )}

        {showResult && (
          <div className="mt-3">
            <hr />
            <QuizResult quizId={id} />
          </div>
        )}
      </div>
    </div>
  );
};

const QuizHistory = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const quizzesPerPage = 10;
  
    useEffect(() => {
      fetchQuizHistory();
    }, []);
  
    const fetchQuizHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/quiz/history`, {
          withCredentials: true
        });
        setQuizzes(response.data.reverse());
      } catch (err) {
        console.error('Error fetching quiz history:', err);
        if (err.response && err.response.status === 401) {
          alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
          navigate('/');  // 로그인 페이지로 리다이렉트
        } else {
          setError('Failed to fetch quiz history. Please try again later.');
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    if (isLoading) return <div className="text-center">Loading quiz history...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
  
    const indexOfLastQuiz = currentPage * quizzesPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
    const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const totalPages = Math.ceil(quizzes.length / quizzesPerPage);
  
    return (
      <div className="container mt-4">
        <h2 className="mb-4">Quiz History</h2>
        {currentQuizzes.map((quiz) => (
            <QuizCard 
            key={quiz.id} 
            quiz={quiz} 
            id={quiz.id} 
            />
        ))}
        <nav>
          <ul className="pagination justify-content-center">
            {[...Array(totalPages).keys()].reverse().map(number => (
              <li key={number + 1} className={`page-item ${currentPage === totalPages - number ? 'active' : ''}`}>
                <button onClick={() => paginate(totalPages - number)} className="page-link">
                  {totalPages - number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  };
  
  export default QuizHistory;