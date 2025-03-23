import React from 'react';
import { Card, Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import './css/LearningPage.css';

// Dữ liệu mô phỏng
const lessons = [
  {
    id: 1,
    title: 'Bài học 1: Giới thiệu',
    lectureFile: 'file-bai-giang-1.pdf',
    exerciseFile: 'bai-tap-1.pdf',
    status: 'Hoàn thành',
  },
  {
    id: 2,
    title: 'Bài học 2: Nội dung chính',
    lectureFile: 'file-bai-giang-2.pdf',
    exerciseFile: null, // Không có bài tập
    status: 'Chưa hoàn thành',
  },
  {
    id: 3,
    title: 'Bài học 3: Thực hành',
    lectureFile: 'file-bai-giang-3.pdf',
    exerciseFile: 'bai-tap-3.pdf',
    status: 'Chưa hoàn thành',
  },
];

const LearningPage = () => {
  return (
    <div className="learning-page-container">
      <h1>Khóa học: Lập trình cơ bản</h1>
      <div className="lessons-horizontal-list">
        {lessons.map(lesson => (
          <Card key={lesson.id} className="horizontal-card">
            <h2>{lesson.title}</h2>
            <p>
              <strong>Bài giảng: </strong>
              {lesson.lectureFile ? (
                <a href={`/${lesson.lectureFile}`} download>
                  Tải xuống
                </a>
              ) : (
                'Không có'
              )}
            </p>
            <p>
              <strong>Bài tập: </strong>
              {lesson.exerciseFile ? (
                <a href={`/${lesson.exerciseFile}`} download>
                  Tải xuống
                </a>
              ) : (
                'Không có'
              )}
            </p>
            <Tag color={lesson.status === 'Hoàn thành' ? 'green' : 'blue'}>
              {lesson.status}
            </Tag>
            <div className="button-group">
              <Button type="primary">
                <Link to={`/lesson-details/${lesson.id}`}>Chi tiết</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPage;
