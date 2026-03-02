require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todosRouter = require('./Routers/todos');

const app = express();
const PORT = 5000;
const MONGODB_URI = process.env.MONGO_URL || 'mongodb+srv://OSY:!3wonder3!@cluster0.u3yu272.mongodb.net/todo';

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB 연결
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('몽고DB 연결성공');
})
.catch((err) => {
  console.log('MongoDB 연결 실패:', err);
});

// 기본 라우트
app.get('/', (req, res) => {
  res.json({ message: 'Todo Backend Server Running...' });
});

// 할일 라우터
app.use('/api/todos', todosRouter);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
