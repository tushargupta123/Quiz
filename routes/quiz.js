const express = require('express');
const { createQuiz, getQuizzes, getQuiz, submitQuiz } = require('../controller/quiz');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create', auth, createQuiz);
router.get('/', auth, getQuizzes);
router.get('/:id', auth, getQuiz);
router.post('/:id/submit', auth, submitQuiz);

module.exports = router;
