//GET Users PAGE
function getInbox(req, res, next){
    res.render("inbox");
}

module.exports = {
    getInbox,
}