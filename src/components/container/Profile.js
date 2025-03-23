import React, { useState, useEffect } from "react";
import "./css/Profile.css";

const Profile = ({ email }) => {
  const [userData, setUserData] = useState({}); // Quản lý thông tin người dùng

  // Gửi yêu cầu lấy dữ liệu người dùng từ API
  useEffect(() => {
    const fetchUserData = async () => {
      if (!email) {
        console.error("Email không được xác định.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5001/api/users/profile?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Lưu thông tin người dùng
        } else {
          console.error("Không tìm thấy người dùng với email:", email);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserData();
  }, [email]);

  return (
    <div className="profile-container">
      <h1>Trang Cá Nhân</h1>
      <div className="profile-section">
        <h2>Thông tin cơ bản</h2>
        <p><strong>Tên:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Ngày tạo tài khoản:</strong> {new Date(userData.create_at).toLocaleDateString()}</p>
        <p><strong>Ngày sinh:</strong> {userData.dob || "Chưa cập nhật"}</p>
        <p><strong>Số điện thoại:</strong> {userData.phone || "Chưa cập nhật"}</p>
        <p><strong>Địa chỉ:</strong> {userData.address || "Chưa cập nhật"}</p>
      </div>
    </div>
  );
};

export default Profile;