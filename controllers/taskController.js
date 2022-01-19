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