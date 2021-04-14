const express = require('express');
const router = express.Router();

router.post('/register', async (req, res, next) => {
    res.send('Register route');
})

module.exports = router;