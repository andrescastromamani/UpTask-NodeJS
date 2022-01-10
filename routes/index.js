const express = require('express');
const router = express.Router();

module.exports = function () {
    router.get('/', (req, res) => {
        res.send('hello world');
    });
    router.get('/about', (req, res) => {
        res.send('about');
    });
    return router;
}