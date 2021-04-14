const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();
require('./helpers/init_mongodb');

const authRouter = require('./routes/auth.router');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


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