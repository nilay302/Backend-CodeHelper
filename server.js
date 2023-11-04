const express = require('express');
const app = express();
const connectDB = require("./db");
require("dotenv").config();
const port = process.env.PORT || 8080;
const userRoutes = require('./routes/users');
const codeforcesRoutes = require('./routes/codeforces');
const leetcodeRoutes = require('./routes/leetcode');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();
app.use(cors());
app.use('/user', userRoutes);
app.use('/codeforces', codeforcesRoutes);
app.use('/leetcode', leetcodeRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to CodeHelper !!!");
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})