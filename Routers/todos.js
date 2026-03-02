const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// 할일 생성
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: '제목은 필수입니다' });
    }

    const newTodo = new Todo({
      title,
      description,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json({ message: '할일이 저장되었습니다', data: savedTodo });
  } catch (error) {
    res.status(500).json({ error: '할일 저장 실패', details: error.message });
  }
});

// 모든 할일 조회
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ data: todos });
  } catch (error) {
    res.status(500).json({ error: '조회 실패', details: error.message });
  }
});

// 특정 할일 조회
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    }

    res.json({ data: todo });
  } catch (error) {
    res.status(500).json({ error: '조회 실패', details: error.message });
  }
});

// 할일 수정
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: '할일을 찾을 수 없습니다' });
    }

    res.json({ message: '할일이 수정되었습니다', data: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: '할일 수정 실패', details: error.message });
  }
});

module.exports = router;
