import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentForm = () => {
  const { id } = useParams(); // Lấy ID khóa học từ URL
  const navigate = useNavigate(); // Điều hướng sau khi thanh toán

  const [course, setCourse] = useState(null); // Dữ liệu khóa học
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0); // Phần trăm giảm giá
  const [finalPrice, setFinalPrice] = useState(0); // Tổng tiền sau khi giảm giá

  useEffect(() => {
    // Gọi API để lấy thông tin chi tiết khóa học
    fetch(`http://localhost:5001/api/course-details/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data);
        const originalPrice = parseFloat(data.price.replace(/[^0-9.-]+/g, '')); // Chuyển giá sang số
        setFinalPrice(originalPrice); // Đặt giá gốc
      })
      .catch((error) => console.error('Lỗi khi lấy chi tiết khóa học:', error));
  }, [id]);

  const handleApplyPromo = () => {
    // Danh sách mã giảm giá hợp lệ
    const validPromoCodes = {
      SAVE20: 20, // Giảm 20%
      SAVE30: 30, // Giảm 30%
      FREE50: 50, // Giảm 50%
    };

    if (promoCode in validPromoCodes) {
      const discountValue = validPromoCodes[promoCode];
      setDiscount(discountValue);
      const originalPrice = parseFloat(course.price.replace(/[^0-9.-]+/g, ''));
      const discountedPrice = originalPrice - (originalPrice * discountValue) / 100;
      setFinalPrice(discountedPrice);

      alert(`Áp dụng mã giảm giá thành công! Giảm ${discountValue}%`);
    } else {
      alert('Mã giảm giá không hợp lệ!');
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      userId: 1, // ID người dùng, có thể lấy từ state hoặc props
      courseId: id,
      paymentMethod: document.getElementById('paymentMethod').value,
      amount: finalPrice, // Giá sau khi giảm giá
    };

    try {
      const response = await fetch('http://localhost:5001/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      if (response.ok) {
        alert('Thanh toán thành công!');
        navigate('/my-courses'); // Chuyển đến trang "Khóa học của tôi"
      } else {
        alert('Thanh toán không thành công. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi khi xử lý thanh toán:', error);
      alert('Đã xảy ra lỗi trong quá trình thanh toán.');
    }
  };

  if (!course) {
    return <p className="text-center">Đang tải...</p>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Phần thông tin khóa học */}
        <div className="col-md-6">
          <div className="card mb-4">
            <img
              src={course.image || 'https://via.placeholder.com/300x200?text=No+Image'}
              alt={course.title}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{course.title}</h5>
              <p className="card-text">{course.description}</p>
              <p><strong>Giá gốc:</strong> {course.price}</p>
            </div>
          </div>
        </div>

        {/* Phần form thanh toán */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Thông tin thanh toán</h5>
              <form onSubmit={handlePaymentSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Họ và tên</label>
                  <input type="text" className="form-control" id="name" placeholder="Nhập họ và tên" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Nhập email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="paymentMethod" className="form-label">Phương thức thanh toán</label>
                  <select className="form-select" id="paymentMethod" required>
                    <option value="vietqr">VietQR</option>
                    <option value="domesticCard">Thẻ nội địa</option>
                    <option value="mobileBanking">Mobile Banking</option>
                    <option value="internationalCard">Thẻ quốc tế</option>
                    <option value="fptPay">Ví FPT Pay</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label><strong>Tổng tiền:</strong></label>
                  <p className="border p-2">{finalPrice.toLocaleString('vi-VN')} VND</p>
                </div>
                <button type="submit" className="btn btn-success w-100">Thanh toán</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;