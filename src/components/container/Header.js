import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Header.css';

const Header = ({ username, onLogout }) => { // Nhận username và hàm logout từ props
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Quản lý trạng thái dropdown

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Đổi trạng thái mở/đóng dropdown
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          KHÓA HỌC TRỰC TUYẾN DHP
        </Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible menu */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/learning">
                Trang Chủ
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/practice">
                Liên Hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Login/Register OR User Dropdown */}
        <div className="d-flex">
          {username ? (
            // Hiển thị icon người dùng khi đã đăng nhập
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="userDropdown"
                aria-expanded={isDropdownOpen}
                onClick={toggleDropdown}
              >
                <i className="bi bi-person-circle"></i> {username} {/* Icon người dùng và tên */}
              </button>
              <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="userDropdown">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Trang cá nhân
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/my-courses">
                    Khóa học của tôi
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={onLogout}>
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            // Hiển thị nút đăng nhập/đăng ký khi chưa đăng nhập
            <>
              <Link to="/login" className="btn btn-primary me-2">
                Đăng nhập
              </Link>
              <Link to="/register" className="btn btn-danger">
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;