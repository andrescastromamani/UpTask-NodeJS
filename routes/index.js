const express = require('express');
const router = express.Router();

const projectController = require('../controllers/projectController')

module.exports = function () {
    router.get('/', projectController.index);
    router.get('/new-project', projectController.create);
    router.post('/new-project', projectController.store);
    return router;
}