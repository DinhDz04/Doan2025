import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/container/Header';
import Login from './components/container/Login';
import Register from './components/container/Register';
import AllCourses from './components/container/AllCourses';
import CourseDetails from './components/container/CourseDetails';
import PaymentForm from './components/container/PaymentForm';
import MyCourses from './components/container/MyCourses';
import LearningPage from './components/container/LearningPage';
import Profile from './components/container/Profile';

function App() {
  const [username, setUsername] = useState(null); // State quản lý email người dùng

  // Khôi phục email từ localStorage khi tải lại trang
  useEffect(() => {
    const storedEmail = localStorage.getItem('username');
    if (storedEmail) {
      setUsername(storedEmail);
    } else {
      console.error("Không tìm thấy email trong localStorage.");
    }
  }, []);
  

  // Xử lý đăng nhập
  const handleLogin = (email) => {
    setUsername(email); // Lưu email vào state
    localStorage.setItem('username', email); // Lưu email vào localStorage
  };
  
  

  // Xử lý đăng xuất
  const handleLogout = () => {
    setUsername(null); // Reset state username
    localStorage.removeItem('username'); // Xóa email khỏi localStorage
  };

  return (
    <Router>
      <div className="app-container">
        {/* Header */}
        <Header username={username} onLogout={handleLogout} />
        <Routes>
          {/* Đăng nhập */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {/* Trang cá nhân */}
          <Route path="/profile" element={<Profile email={username} />} />

          {/* Các route khác */}
          <Route path="/" element={<AllCourses />} />
          <Route path="/course-details/:id" element={<CourseDetails />} />
          <Route path="/payment/:id" element={<PaymentForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/learning-page" element={<LearningPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;