exports.home = (req, res) => {
    res.render('index', {
        nameProject: 'UpTask'
    })
}
exports.about = (req, res) => {
    res.send('about')
}