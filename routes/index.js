const express = require('express');
const router = express.Router();

const { home, about } = require('../controllers/projectController')

module.exports = function () {
    router.get('/', home);
    router.get('/about', about);
    return router;
}