const express = require('express');
const router = express.Router();

//express validator
const { body } = require('express-validator');

const projectController = require('../controllers/projectController')
const taskController = require('../controllers/taskController')

module.exports = function () {
    //Projects
    router.get('/', projectController.index);
    router.get('/new-project', projectController.create);
    router.post('/new-project',
        body('name').not().isEmpty().trim().escape().withMessage('Name is required'),
        body('description').not().isEmpty().trim().escape().withMessage('Description is required'),
        projectController.store
    );
    router.get('/projects/:url', projectController.show);
    router.get('/project/edit/:id', projectController.edit);
    router.post('/new-project/:id',
        body('name').not().isEmpty().trim().escape().withMessage('Name is required'),
        body('description').not().isEmpty().trim().escape().withMessage('Description is required'),
        projectController.update
    );
    router.delete('/projects/:url', projectController.destroy);

    //Tasks
    router.post('/projects/:url', taskController.store);
    
    return router;
}