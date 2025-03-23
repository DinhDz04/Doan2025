import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        onLogin(data.name);
        setMessage('Đăng nhập thành công!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMessage('Email hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      setMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-center">Đăng Nhập</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-btn-primary">
            Đăng Nhập
          </button>
          {message && <p className="auth-message">{message}</p>}
        </form>
        <div className="auth-divider">Hoặc</div>
        <button
          className="auth-btn-google"
          onClick={() => (window.location.href = 'http://localhost:5001/auth/google')}
        >
          Đăng nhập với Google
        </button>
      </div>
    </div>
  );
};

export default Login;