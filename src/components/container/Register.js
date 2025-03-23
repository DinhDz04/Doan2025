import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setMessage('Đăng ký thành công! Chuyển đến đăng nhập...');
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage('Email đã tồn tại hoặc có lỗi xảy ra.');
      }
    } catch (error) {
      setMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="text-center">Đăng Ký</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Tên đầy đủ"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="auth-input"
          />
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
            Đăng Ký
          </button>
          {message && <p className="auth-message">{message}</p>}
        </form>
        <div className="auth-divider">Hoặc</div>
        <button
          className="auth-btn-google"
          onClick={() => (window.location.href = 'http://localhost:5001/auth/google')}
        >
          Đăng ký với Google
        </button>
      </div>
    </div>
  );
};

export default Register;