const Project = require('../models/Project');

exports.index = async (req, res) => {
    const projects = await Project.findAll();
    res.render('index', {
        nameProject: 'UpTask',
        projects
    })
}

exports.create = async (req, res) => {
    const projects = await Project.findAll();
    res.render('create', {
        nameProject: 'UpTask - Create',
        projects
    })
}

exports.store = async (req, res) => {
    const projects = await Project.findAll();
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
        const project = Project.create({
            name,
            description
        });
        res.redirect('/');
    }
}
exports.show = async (req, res) => {
    const projects = await Project.findAll();
    const project = await Project.findOne({
        where: {
            url: req.params.url
        }
    });
    res.render('show', {
        nameProject: 'UpTask - Show',
        project,
        projects
    })
}