const createError = require("http-errors");

//404 not found
function notFoundHandler(req, res, next) {
  next(createError(404, "CONTENT WAS NOT FOUND!"));
}

//default error handler (bcz its default error handler thats why it will have err first)
function errorHandler(err, req, res, next) {
  //view folder>error file below error is the file name error.ejs
  res.render("error", {
    title: "Error Page 007",
  });
  //   if we want to send tittle as local variables
  //   thn write (res.locals.tittle = "Error page";)
}

module.exports = {
  //full way to write
  notFoundHandler: notFoundHandler,

  errorHandler,
  //^shortcut way to write^
};
