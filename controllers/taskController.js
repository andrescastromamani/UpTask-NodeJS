const Project = require('../models/project');
const Task = require('../models/task');

exports.store = async (req, res, next) => {
    const project = await Project.findOne({
        where: {
            url: req.params.url
        }
    });
    const { task } = req.body;
    const status = 0;
    const projectId = project.id;
    await Task.create({
        title: task,
        status,
        projectId
    });
    if (!res) {
        return next();
    }
    //redirect
    res.redirect(`/projects/${req.params.url}`);
}
exports.update = async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findOne({
        where: {
            id
        }
    });
    if (task.status == 0) {
        task.status = 1;
    } else {
        task.status = 0;
    }
    const result = await task.save();
    if (!result) {
        return next();
    }
    res.status(200).send('update task');
}

exports.destroy = async (req, res, next) => {
    console.log(req.params);
    const { id } = req.params;
    const result = await Task.destroy({
        where: {
            id
        }
    });
    if (!result) {
        return next();
    }
    res.status(200).send('destroy task');
}  