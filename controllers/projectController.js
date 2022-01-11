exports.index = (req, res) => {
    res.render('index', {
        nameProject: 'UpTask'
    })
}

exports.create = (req, res) => {
    res.render('create', {
        nameProject: 'UpTask - Create'
    })
}

exports.store = (req, res) => {
    const { name, description } = req.body;
    let errors = [];
    if (!name || !description) {
        errors.push({ 'msg': 'Please enter all fields' });
    }
    if (errors.length > 0) {
        res.render('create', {
            nameProject: 'UpTask - Create',
            errors
        });
    } else {
        res.send('Success');
    }
}