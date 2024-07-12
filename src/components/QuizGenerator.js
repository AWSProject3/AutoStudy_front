import React, { useState } from 'react';
import axios from 'axios';
import QuizForm from './QuizForm';
import QuizDisplay from './QuizDisplay';
import { useNavigate } from 'react-router-dom';

const QuizGenerator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [quizContent, setQuizContent] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const navigate = useNavigate();

  const handleGenerateQuiz = async (sourceLanguage, targetLanguage, difficulty) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/quiz/generate', {
        source_language: sourceLanguage,
        target_language: targetLanguage,
        difficulty: difficulty
      }, {
        withCredentials: true
      });
      console.log('Quiz generated:', response.data);
      setQuizContent(response.data);
      setUserAnswer('');  // Reset user answer when new quiz is generated
    } catch (err) {
      console.error('Error generating quiz:', err);
      if (err.response && err.response.status === 401) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <QuizForm onGenerateQuiz={handleGenerateQuiz} isLoading={isLoading} />
      {quizContent && (
        <QuizDisplay 
          quizContent={quizContent} 
          userAnswer={userAnswer} 
          setUserAnswer={setUserAnswer} 
        />
      )}
    </div>
  );
};

export default QuizGenerator;