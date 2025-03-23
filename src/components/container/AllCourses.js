import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/AllCourses.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5001/api/courses')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Lỗi khi gọi API:', error));
  }, []);

  return (
    <div className="container">
      <Navbar />
      <br/>
      <h1> TẤT CẢ KHÓA HỌC</h1>
      <div className="row">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img
              src={course.image || 'https://via.placeholder.com/300x200?text=No+Image'}
              alt={course.title}
            />
            <div className="course-content">
              <div className="course-title">{course.title}</div>
              <div className="course-details">
                Người tạo: {course.creator} <br />
                Đánh giá: {course.rating} ⭐
              </div>
              <div className="course-price">
                {course.discount ? (
                  <>
                    <span className="old-price">{course.oldPrice}</span>
                    <span> {course.newPrice}</span>
                    <span className="discount">-{course.discount}%</span>
                  </>
                ) : (
                  <span>{course.price}</span>
                )}
              </div>
            </div>
            <div className="course-actions">
              <Link to={`/course-details/${course.id}`} className="btn btn-primary">
                Xem chi tiết
              </Link>
              <Link to={`/payment/${course.id}`} className="btn btn-success">
                Mua
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
