import React, { useState } from 'react';
import axios from 'axios';
import CodeEditor from './CodeEditor';
import GradeResult from './GradeResult';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const QuizDisplay = ({ quizContent, userAnswer, setUserAnswer }) => {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gradeResult, setGradeResult] = useState(null);
  const [isGrading, setIsGrading] = useState(false);
  const navigate = useNavigate();

  const handleGrade = async () => {
    setIsGrading(true);
    try {
      console.log(userAnswer);
      const response = await axios.post(`${API_URL}/api/quiz/grade`, {
        id: quizContent.id,
        source_language: quizContent.source_language,
        target_language: quizContent.target_language,
        difficulty: quizContent.difficulty,
        quiz: quizContent.quiz,
        user_input_code: userAnswer
      }, {
        withCredentials: true
      });
      setGradeResult(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error grading quiz:', error);
      if (error.response && error.response.status === 401) {
        alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
        navigate('/');  // 로그인 페이지로 리다이렉트
      } else {
        alert('퀴즈 채점 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="card mt-3 mb-5 bg-light text-dark">
      <div className="card-body">
        <h5 className="card-title">생성된 문제</h5>
        <hr />
        <div className="mb-3">
          <p><strong>나의 주력 언어:</strong> {quizContent.source_language}</p>
          <p><strong>학습할 언어:</strong> {quizContent.target_language}</p>
          <p><strong>난이도:</strong> {quizContent.difficulty}</p>
          <p><strong>Category:</strong> {quizContent.category.type} - {quizContent.category.detail}</p>
        </div>
        <hr />
        <div className="mb-3">
          <pre className="bg-dark text-light p-2 rounded" style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              overflow: 'auto',
              maxHeight: '300px'
            }}>
              {quizContent.quiz}
            </pre>
        </div>
        <div className="d-flex justify-content-start align-items-center mb-3">
          <button 
            className="btn btn-outline-info me-2"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? '힌트 숨기기' : '힌트 보기'}
          </button>
          <button 
            className="btn btn-outline-success"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            {showAnswer ? '정답 숨기기' : '정답 보기'}
          </button>
        </div>
        
        {showHint && (
          <div className="mb-3">
            <hr />
            <h6>Hint:</h6>
            <p>{quizContent.hint.describe}</p>
            <pre className="bg-dark text-light p-2 rounded">{quizContent.hint.source_language_code}</pre>
          </div>
        )}

        {showAnswer && (
          <div className="mb-3">
            <hr />
            <h6>Answer:</h6>
            <pre className="bg-dark text-light p-2 rounded">{quizContent.answer}</pre>
          </div>
        )}
        
        <hr />
        <div className="mb-3">
          <h6>당신의 답변:</h6>
          <CodeEditor
            language={quizContent.target_language.toLowerCase()}
            value={userAnswer}
            onChange={setUserAnswer}
          />
        </div>
        <button 
          className="btn btn-primary mt-3" 
          onClick={handleGrade}
          disabled={isGrading}
        >
          {isGrading ? '채점 중...' : '채점하기'}
        </button>
        
        {gradeResult && (
          <div className="mt-3">
            <hr />
            <GradeResult result={gradeResult} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizDisplay;