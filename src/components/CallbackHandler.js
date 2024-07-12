import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CallbackHandler = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // 서버에 토큰 유효성 확인 요청
        const response = await fetch('/api/verify-token', {
          method: 'GET',
          credentials: 'include', // 쿠키 포함
        });

        if (response.ok) {
          // 토큰이 유효하면 대시보드로 이동
          navigate('/dashboard');
        } else {
          // 토큰이 유효하지 않으면 에러 설정
          setError('Failed to verify tokens');
        }
      } catch (err) {
        setError('Error processing callback');
        console.error('Callback error:', err);
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return <div className="text-center">Processing login...</div>;
};

export default CallbackHandler;