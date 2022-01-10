exports.home = (req, res) => {
    res.render('index')
}
exports.about = (req, res) => {
    res.send('about')
}