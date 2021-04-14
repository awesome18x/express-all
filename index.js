const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();

const authRouter = require('./routes/auth.router');

const app = express();

app.get("/", async (req, res, next) => {
    res.send("Hello world");
});

app.use('/auth', authRouter);

app.get(async (req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.get((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});