import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';


const API_DOMAIN = process.env.REACT_APP_API_DOMAIN;

const QnABoard = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const ws = useRef(null);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const connectWebSocket = useCallback(() => {
        if (ws.current && (ws.current.readyState === WebSocket.OPEN || ws.current.readyState === WebSocket.CONNECTING)) {
            console.log('WebSocket is already connected or connecting');
            return;
        }

        console.log('Attempting to connect WebSocket...');
        ws.current = new WebSocket(`ws://${API_DOMAIN}/api/qna/ws`);

        ws.current.onopen = () => {
            console.log('WebSocket connected');
            setIsConnected(true);
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'history') {
                setMessages(data.content.map(msg => ({
                    type: msg.role === 'user' ? 'user' : 'ai',
                    content: msg.content[0].text
                })));
            } else {
                setMessages(prev => [...prev, { type: 'ai', content: data.ai_response }]);
            }
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            if (error.message) {
                console.error('Error message:', error.message);
            }
        };

        ws.current.onclose = (event) => {
            console.log('WebSocket disconnected:', event.code, event.reason);
            setIsConnected(false);
            if (event.code === 1001) {  // 401 Unauthorized
                alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
                navigate('/');  // 로그인 페이지로 리다이렉트
            } else {
                setTimeout(connectWebSocket, 3000);  // 3초 후 재연결 시도
            }
        };
    }, [navigate]);

    const disconnectWebSocket = useCallback(() => {
        if (ws.current) {
            ws.current.close();
            ws.current = null;
            setIsConnected(false);
            console.log('WebSocket disconnected manually');
        }
    }, []);

    useEffect(() => {
        connectWebSocket();
        return () => {
            disconnectWebSocket();
        };
    }, [connectWebSocket, disconnectWebSocket]);

    useEffect(scrollToBottom, [messages]);

    const sendMessage = (event) => {
        event.preventDefault();
        if (inputMessage && isConnected) {
            setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
            ws.current.send(inputMessage);
            setInputMessage('');
        }
    };

    return (
        <div className="container mt-4 mb-4">
            <h2>Q&A Board</h2>
            <div className="card">
                <div className="card-body" style={{height: '600px', overflowY: 'auto'}}>
                    {messages.map((message, index) => (
                        <div
                        key={index}
                        className={`mb-3 d-flex align-items-end ${
                          message.type === 'user'
                            ? 'justify-content-start'
                            : 'justify-content-end'
                        }`}
                      >
                        <div
                          className={`px-3 py-2 rounded ${
                            message.type === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-light text-dark'
                          }`}
                          style={{ maxWidth: '70%' }}
                        >
                          <ReactMarkdown className="d-inline-block text-left">
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="card-footer">
                    <form onSubmit={sendMessage}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Type your question..."
                                disabled={!isConnected}
                            />
                            <button className="btn btn-primary" type="submit" disabled={!isConnected}>Send</button>
                        </div>
                    </form>
                    {!isConnected && <p className="text-danger mt-2">Disconnected. Trying to reconnect...</p>}
                </div>
            </div>
        </div>
    );
};

export default QnABoard;