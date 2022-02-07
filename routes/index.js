const express = require('express');
const router = express.Router();

//express validator
const { body } = require('express-validator');

const projectController = require('../controllers/projectController')
const taskController = require('../controllers/taskController')
const authController = require('../controllers/authController')
const authenticationController = require('../controllers/authenticationController')

module.exports = function () {
    //Projects
    router.get('/',
        authenticationController.userAuth,
        projectController.index
    );
    router.get('/new-project',
        authenticationController.userAuth,
        projectController.create
    );
    router.post('/new-project',
        authenticationController.userAuth,
        body('name').not().isEmpty().trim().escape().withMessage('Name is required'),
        body('description').not().isEmpty().trim().escape().withMessage('Description is required'),
        projectController.store
    );
    router.get('/projects/:url',
        authenticationController.userAuth,
        projectController.show
    );
    router.get('/project/edit/:id',
        authenticationController.userAuth,
        projectController.edit
    );
    router.post('/new-project/:id',
        authenticationController.userAuth,
        body('name').not().isEmpty().trim().escape().withMessage('Name is required'),
        body('description').not().isEmpty().trim().escape().withMessage('Description is required'),
        projectController.update
    );
    router.delete('/projects/:url',
        authenticationController.userAuth,
        projectController.destroy
    );

    //Tasks
    router.post('/projects/:url',
        authenticationController.userAuth,
        taskController.store
    );
    router.patch('/tasks/:id',
        authenticationController.userAuth,
        taskController.update
    );
    router.delete('/tasks/:id',
        authenticationController.userAuth,
        taskController.destroy
    );

    //Authentication
    router.get('/auth/register', authController.register);
    router.post('/auth/register', authController.store);
    router.get('/auth/login', authController.login);
    router.post('/auth/login', authenticationController.auth);
    router.get('/auth/logout', authenticationController.logout);
    router.get('/auth/forgot', authController.forgot);
    router.post('/auth/forgot', authenticationController.sendToken);
    router.get('/auth/forgot/:token', authenticationController.resetPassword);
    router.post('/auth/forgot/:token', authenticationController.reset);
    router.get('/auth/confirm/:email', authController.confirm);

    return router;
}