const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());


// Kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Thay bằng mật khẩu của bạn nếu có
  database: 'qlkh', // Tên cơ sở dữ liệu
});

db.connect((err) => {
  if (err) {
    console.error('Kết nối tới MySQL thất bại:', err);
    return;
  }
  console.log('Kết nối tới MySQL thành công!');
});

// API: Lấy danh sách khóa học
app.get('/api/courses', (req, res) => {
  const sql = 'SELECT * FROM courses';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      res.status(500).send('Lỗi khi lấy danh sách khóa học.');
    } else {
      res.json(results);
    }
  });
});

// API: Lấy chi tiết khóa học
app.get('/api/course-details/:id', (req, res) => {
  const sql = 'SELECT * FROM courses WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      res.status(500).send('Lỗi khi lấy chi tiết khóa học.');
    } else if (result.length === 0) {
      res.status(404).send('Không tìm thấy khóa học.');
    } else {
      res.json(result[0]);
    }
  });
});

// API: Lấy danh sách bài học
app.get('/api/lessons/:courseId', (req, res) => {
  const sql = 'SELECT title FROM lessons WHERE course_id = ? ORDER BY `order` ASC';
  db.query(sql, [req.params.courseId], (err, results) => {
    if (err) {  
      console.error('Lỗi truy vấn:', err);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách bài học.' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Không tìm thấy bài học nào.' });
    } else {
      res.json(results);
    }
  });
});
// Khởi động server



// Kết nối tới cơ sở dữ liệu
db.connect((err) => {
  if (err) {
    console.error('Lỗi khi kết nối cơ sở dữ liệu:', err);
    return;
  }
  console.log('Kết nối cơ sở dữ liệu thành công!');
});

// Endpoint đăng ký người dùng
app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
  }

  try {
    // Kiểm tra xem email đã tồn tại hay chưa
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], async (err, results) => {
      if (err) {
        console.error('Lỗi khi kiểm tra email:', err);
        return res.status(500).json({ message: 'Lỗi máy chủ.' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'Email đã được sử dụng.' });
      }

      // Mã hóa mật khẩu
      const hashedPassword = await bcrypt.hash(password, 10);

      // Thêm người dùng mới vào cơ sở dữ liệu
      const insertUserQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.query(insertUserQuery, [name, email, hashedPassword], (err, results) => {
        if (err) {
          console.error('Lỗi khi thêm người dùng:', err);
          return res.status(500).json({ message: 'Lỗi khi đăng ký.' });
        }

        return res.status(201).json({ message: 'Đăng ký thành công!' });
      });
    });
  } catch (err) {
    console.error('Lỗi:', err);
    res.status(500).json({ message: 'Đã xảy ra lỗi. Vui lòng thử lại.' });
  }
});

// API: Đăng nhập
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra yêu cầu đầy đủ thông tin
  if (!email || !password) {
    return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
  }

  try {
    // Tìm người dùng theo email
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('Lỗi khi truy vấn cơ sở dữ liệu:', err);
        return res.status(500).json({ message: 'Lỗi máy chủ.' });
      }

      // Nếu không tìm thấy người dùng
      if (results.length === 0) {
        return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
      }

      const user = results[0];

      // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong cơ sở dữ liệu
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
      }

      // Thành công, trả về thông tin người dùng
      return res.status(200).json({ message: 'Đăng nhập thành công!', name: user.name });
    });
  } catch (err) {
    console.error('Lỗi:', err);
    res.status(500).json({ message: 'Đã xảy ra lỗi. Vui lòng thử lại.' });
  }
});
const handleLogin = async (email, password) => {
  try {
    const response = await fetch('http://localhost:5001/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setUsername(data.name); // Cập nhật state React
      localStorage.setItem('username', data.name); // Lưu vào localStorage
    } else {
      console.error('Đăng nhập thất bại!');
    }
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
  }
};
// API: Lấy thông tin người dùng từ email
app.get('/api/users/profile', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email không được bỏ trống.' });
  }

  const sql = `
    SELECT name, email, created_at,  phone, address, education, experience, social_links
    FROM users
    WHERE email = ?
  `;

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Lỗi khi truy vấn cơ sở dữ liệu:', err);
      return res.status(500).json({ message: 'Lỗi máy chủ.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
    }

    const userData = results[0];
    userData.education = JSON.parse(userData.education || '[]');
    userData.experience = JSON.parse(userData.experience || '[]');
    userData.social_links = JSON.parse(userData.social_links || '{}');

    res.json(userData); // Trả dữ liệu đầy đủ về frontend
  });
});

// API: Cập nhật thông tin người dùng
app.post('/api/users/update', (req, res) => {
  const { email, name, dob, phone, address, education, experience, social_links } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email không được bỏ trống.' });
  }

  const sql = `
    UPDATE users
    SET name = ?, dob = ?, phone = ?, address = ?, education = ?, experience = ?, social_links = ?
    WHERE email = ?
  `;

  db.query(sql, [name, dob, phone, address, JSON.stringify(education), JSON.stringify(experience), JSON.stringify(social_links), email], (err, results) => {
    if (err) {
      console.error('Lỗi khi cập nhật thông tin:', err);
      return res.status(500).json({ message: 'Lỗi máy chủ.' });
    }

    res.json({ message: 'Cập nhật thành công!', name, dob, phone, address, education, experience, social_links });
  });
});
// Khởi động server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
module.exports = db;
