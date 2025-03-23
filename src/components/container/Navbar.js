import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { AppstoreOutlined, BookOutlined, InfoCircleOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import './css/Navbar.css';

const categoryMenu = (
  <Menu>
    <Menu.Item key="1">
      <Link to="/categories/category1">Lập Trình Căn Bản</Link>
    </Menu.Item>
    <Menu.Item key="2">
      <Link to="/categories/category2">Lập Trình Nâng Cao</Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/categories/category3">Khóa Học của tôi</Link>
    </Menu.Item>
  </Menu>
);

const Navbar = () => {
  return (
    <div className="navbar" style={{
      backgroundColor: '#d6eefb',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
    }}>
      <div className="d-flex align-items-center flex-grow-1 justify-content-center">
        <Dropdown overlay={categoryMenu} trigger={['click']}>
          <span className="nav-link" style={{display: 'flex', alignItems: 'center', marginRight: '15px', cursor: 'pointer'}}>
            <BookOutlined style={{ marginRight: '10px' }} />
            <Link to="/" className="nav-link" style={{display: 'flex', alignItems: 'center', marginRight: '15px', cursor: 'pointer'}}>
            Tất cả Khóa Học
            </Link>
          </span>
        </Dropdown>
        <Link to="/laptrinhcanban" className="nav-link" style={{display: 'flex', alignItems: 'center', marginRight: '15px', cursor: 'pointer'}}>
          <AppstoreOutlined style={{ color:'black',marginRight: '10px' }} />
          Lập Trình Căn Bản
        </Link>
        <Link to="/my-courses" className="nav-link" style={{display: 'flex', alignItems: 'center', marginRight: '15px', cursor: 'pointer'}}>
          Lập trình nâng cao
        </Link>
        <Link to="/my-courses" className="nav-link" style={{display: 'flex', alignItems: 'center', marginRight: '15px', cursor: 'pointer'}}>
          <UserOutlined style={{ marginRight: '10px' }} />
          Khóa học của tôi
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
