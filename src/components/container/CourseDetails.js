import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/CourseDetails.css';
import { Link } from 'react-router-dom';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5001/api/course-details/${id}`)
      .then((response) => response.json())
      .then((data) => setCourse(data))
      .catch((error) => console.error('Lỗi khi lấy chi tiết khóa học:', error));
  } , [id]);
  useEffect(() => {
    fetch(`http://localhost:5001/api/lessons/${id}`)
      .then((response) => response.json())
      .then((data) => setLessons(data))
      .catch((error) => console.error('Lỗi khi lấy danh sách bài học:', error));
  }, [id]);
   
  if (!course) {
    return <p className="text-center">Đang tải thông tin khóa học...</p>;
  }

  return (
    <div className="course-details-container">
      <h1>{course.title}</h1>

      {/* Navbar */}
      <div className="course-navbar">
        <a href="#gioi-thieu" className="active-tab">Giới thiệu</a>
        <a href="#lo-trinh">Lộ trình</a>
        <a href="#noi-dung">Nội dung khóa học</a>
        <a href="#binh-luan">Bình luận</a>
        <a href="#danh-gia">Đánh giá</a>
      </div>

      {/* Lộ trình và thông tin khóa học */}
      <div className="row">
      <div className="image-info-container">
        <img className="img-responsive" 
          src={course.image || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={course.title}
        />
        <div className="image-info-content">
          <div className="title">{course.title}</div>
          <div className="description">{course.description}</div>
          <div className="price">Giá: {course.price}</div>
          <div className="rating">Đánh giá: {course.rating} ⭐</div>
          <div className="course-actions">
              <Link to={`/course-details/${course.id}`} className="btn btn-primary">
                Học Thử
              </Link>
              <Link to={`/payment/${course.id}`} className="btn btn-success">
                Mua
              </Link>
            </div>
        </div>
      </div>
        <div className="col-md-6">
          <div className="course-info">
            <div>
              <span className="icon"></span>
              <h5>Giới thiệu</h5>
              <p>{course.gioithieu || 'Không có thông tin giới thiệu cho khóa học này.'}</p>
            </div>
          </div>
        </div>
        <div className="course-info">
            <div>
              <span className="icon">📋</span>
              <h5>Lộ trình</h5>
              {lessons.length > 0 ? (
  <ul>
    {lessons.map((lesson, index) => (
      <li key={index}>{lesson.title}</li>
    ))}
  </ul>
) : (
  <p>Không có bài học nào trong lộ trình này.</p>
)}

            </div>
          </div>
      </div>
    </div>
  );
};

export default CourseDetails;
