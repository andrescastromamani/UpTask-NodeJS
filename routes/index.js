const express = require('express');
const router = express.Router();

//express validator
const { body } = require('express-validator');

const projectController = require('../controllers/projectController')

module.exports = function () {
    router.get('/', projectController.index);
    router.get('/new-project', projectController.create);
    router.post('/new-project',
        body('name').not().isEmpty().trim().escape().withMessage('Name is required'),
        body('description').not().isEmpty().trim().escape().withMessage('Description is required'),
        projectController.store
    );
    router.get('/projects/:url', projectController.show);
    return router;
}