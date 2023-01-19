//GET Users PAGE
function getInbox(req, res, next){
    res.render("inbox", {
        title: "Inbox page",
    });
}

module.exports = {
    getInbox,
}