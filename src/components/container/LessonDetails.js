import React, { useState } from 'react';
import { Card, Upload, Button, Typography, Tag } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './css/LessonDetails.css';

const { Dragger } = Upload;

const LessonDetails = () => {
  const [submissionStatus, setSubmissionStatus] = useState('Chưa nộp bài'); // Trạng thái bài nộp

  const props = {
    name: 'file',
    multiple: false,
    action: '/upload', // URL giả lập
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        alert('Bài tập của bạn đã được tải lên thành công!');
        setSubmissionStatus('Đã nộp, chờ chấm điểm'); // Cập nhật trạng thái
      } else if (status === 'error') {
        alert('Tải lên thất bại, vui lòng thử lại.');
      }
    },
  };

  return (
    <div className="lesson-details-container">
      <Typography.Title level={1} className="lesson-title">Chi tiết bài học</Typography.Title>
      
      <div className="lesson-layout">
        {/* Phần 1: Nội dung bài giảng */}
        <Card className="lesson-content" title="Nội dung">
          <p>
            <strong>File bài giảng: </strong>
            <a href="/bai-giang-1.pdf" download>Tải xuống</a>
          </p>
        </Card>

        {/* Phần 2: File bài tập */}
        <Card className="lesson-content" title="Bài tập">
          <p>
            <strong>File bài tập: </strong>
            <a href="/bai-tap-1.pdf" download>Tải xuống</a>
          </p>
        </Card>

        {/* Phần 3: Trạng thái */}
        <Card className="lesson-status" title="Trạng thái">
          <p>
            <strong>Trạng thái: </strong>
            <Tag color={submissionStatus === 'Chưa nộp bài' ? 'red' : 'blue'}>{submissionStatus}</Tag>
          </p>
          {submissionStatus === 'Chưa nộp bài' && (
            <Dragger {...props} className="upload-area">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p>Kéo thả tệp vào đây hoặc nhấn để tải lên.</p>
            </Dragger>
          )}
        </Card>
      </div>
    </div>
  );
};

export default LessonDetails;
