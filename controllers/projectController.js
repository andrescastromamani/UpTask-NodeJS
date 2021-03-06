const Project = require('../models/Project');
const Task = require('../models/Task');

exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Project.findAll(
        {
            where: {
                userId
            }
        }
    );
    res.render('index', {
        nameProject: 'UpTask',
        projects
    })
}

exports.create = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Project.findAll({
        where: {
            userId
        }
    });
    res.render('create', {
        nameProject: 'UpTask - Create',
        projects
    })
}

exports.store = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Project.findAll({
        where: {
            userId
        }
    });
    const { name, description } = req.body;
    let errors = [];
    if (!name || !description) {
        errors.push({ 'msg': 'Please enter all fields' });
    }
    if (errors.length > 0) {
        res.render('create', {
            nameProject: 'UpTask - Create',
            errors,
            projects
        });
    } else {
        //const slugName = slug(name).toLowerCase();
        const userId = res.locals.user.id;
        const project = Project.create({
            name,
            description,
            userId
        });
        res.redirect('/');
    }
}
exports.show = async (req, res, next) => {
    const userId = res.locals.user.id;
    const projects = await Project.findAll({
        where: {
            userId
        }
    });
    const project = await Project.findOne({
        where: {
            url: req.params.url,
            userId
        }
    });
    //Get Task of the project
    const tasks = await Task.findAll({
        where: {
            projectId: project.id
        },
        include: [
            {
                model: Project
            }
        ]
    });

    if (!project) return next();
    res.render('show', {
        nameProject: 'UpTask - Task',
        project,
        projects,
        tasks
    })
}
exports.edit = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Project.findAll({
        where: {
            userId
        }
    });
    const project = await Project.findOne({
        where: {
            id: req.params.id,
            userId
        }
    });
    res.render('create', {
        nameProject: 'UpTask - Edit',
        projects,
        project
    })
}
exports.update = async (req, res) => {
    const userId = res.locals.user.id;
    const projects = await Project.findAll({
        where: {
            userId
        }
    });
    const { name, description } = req.body;
    let errors = [];
    if (!name || !description) {
        errors.push({ 'msg': 'Please enter all fields' });
    }
    if (errors.length > 0) {
        res.render('create', {
            nameProject: 'UpTask - Create',
            errors,
            projects
        });
    } else {
        //const slugName = slug(name).toLowerCase();
        await Project.update(
            {
                name,
                description
            }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect('/');
    }
}

exports.destroy = async (req, res, next) => {
    const urlProject = req.params.url;
    console.log(urlProject);
    await Project.destroy({
        where: {
            url: urlProject
        }
    });
    res.status(200).send('Project deleted');
}