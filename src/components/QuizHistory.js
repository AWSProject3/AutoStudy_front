import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuizResult from './QuizResult'; 

const QuizCard = ({ quiz, id }) => {
  const [showDetails, setShowDetails] = useState(false);

  const [showResult, setShowResult] = useState(false);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">Quiz #{id}</h5>
        <p className="card-text">{quiz.quiz}</p>
        <p className="card-text"><strong>Difficulty:</strong> {quiz.difficulty}</p>
        <div className="d-flex justify-content-start align-items-center">
          <button 
            className="btn btn-primary me-2" 
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowResult(!showResult)}
          >
            {showResult ? 'Hide' : 'Result'}
          </button>
        </div>
        
        {showDetails && (
          <div className="mt-3">
            <p><strong>Source Language:</strong> {quiz.source_language}</p>
            <p><strong>Target Language:</strong> {quiz.target_language}</p>
            <p><strong>Category:</strong> {quiz.category.type} - {quiz.category.detail}</p>
            <h6>Hint:</h6>
            <p>{quiz.hint.describe}</p>
            <pre>{quiz.hint.source_language_code}</pre>
            <h6>Answer:</h6>
            <pre>{quiz.answer}</pre>
          </div>
        )}

        {showResult && (
          <div className="mt-3">
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
  
    const quizzesPerPage = 10;
  
    useEffect(() => {
      fetchQuizHistory();
    }, []);
  
    const fetchQuizHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/quiz/history', {
          withCredentials: true
        });
        // 퀴즈 배열을 역순으로 정렬
        setQuizzes(response.data.reverse());
      } catch (err) {
        console.error('Error fetching quiz history:', err);
        setError('Failed to fetch quiz history. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
  
    if (isLoading) return <div>Loading quiz history...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
  
    const indexOfLastQuiz = currentPage * quizzesPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
    const currentQuizzes = quizzes.slice(indexOfFirstQuiz, indexOfLastQuiz);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const totalPages = Math.ceil(quizzes.length / quizzesPerPage);
  
    return (
      <div>
        <h2>Quiz History</h2>
        {currentQuizzes.map((quiz) => (
            <QuizCard 
            key={quiz.id} 
            quiz={quiz} 
            id={quiz.id} 
            />
        ))}
        <nav>
          <ul className="pagination">
            {[...Array(totalPages).keys()].reverse().map(number => (
              <li key={number + 1} className="page-item">
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