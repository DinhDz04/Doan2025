import React from 'react';
import { Card, Button, Tag } from 'antd';
import { Link } from 'react-router-dom';
import './css/MyCourses.css';

const myCourses = [
  {
    id: 1,
    title: 'Khóa học A',
    status: 'Hoàn thành', // Trạng thái khóa học
    startDate: '01/03/2023',
    image: 'https://th.bing.com/th/id/OIP.e9ckRU86kRIiUYkSQ_JTVgHaEK?w=323&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
  {
    id: 2,
    title: 'Khóa học B',
    status: 'Đang học',
    startDate: '15/04/2023',
    image: 'https://th.bing.com/th/id/OIP.e9ckRU86kRIiUYkSQ_JTVgHaEK?w=323&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  },
  // Thêm các khóa học khác ở đây
];

const MyCourses = () => {
  return (
    <div className="my-courses-container">
      <h1>Khóa học của tôi</h1>
      <div className="courses-list">
        {myCourses.map(course => (
          <Card key={course.id} className="course-card" cover={<img alt={course.title} src={course.image} />}>
            <h2>{course.title}</h2>
            <p><strong>Ngày bắt đầu:</strong> {course.startDate}</p>
            <Tag color={course.status === 'Hoàn thành' ? 'green' : 'blue'}>
              {course.status}
            </Tag>
            <div className="button-group">
              <Button type="primary" style={{ marginRight: '10px' }}>
                <Link to={`/learning-page/${course.id}`}>Học</Link> {/* Thêm nút "Học" */}
              </Button>
              <Button>
                <Link to={`/course-details/${course.id}`}>Xem chi tiết</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;
