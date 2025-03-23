const mysql = require('mysql');

// Kết nối MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Mặc định của XAMPP là trống
  database: 'qlkh', // Tên database
});

connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối CSDL:', err);
    return;
  }
  console.log('Kết nối tới MySQL thành công!');
});

module.exports = connection;
