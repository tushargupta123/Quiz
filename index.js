const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config();

const userRoutes = require('./routes/user');
const quizRoutes = require('./routes/quiz');

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to db"))
.catch((err) => console.log(err));

app.use(express.json());

app.use('/user',userRoutes);
app.use('/quiz',quizRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("Server is running on port : "+ PORT);
})