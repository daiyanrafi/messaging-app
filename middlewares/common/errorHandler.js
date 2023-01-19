const createError = require("http-errors");

//404 not found
function notFoundHandler(req, res, next) {
  next(createError(404, "CONTENT WAS NOT FOUND!"));
}

//default error handler (bcz its default error handler thats why it will have err first)
function errorHandler(err, req, res, next) {
  //view folder>error file below error is the file name error.ejs
  // res.render("error", {
  //   title: "Error Page",
  // });
  // res.locals.tittle = "Error page";
  // res.render("error");
  // res.render('index',{layout:false});
  //   if we want to send tittle as local variables
  //   thn write (res.locals.tittle = "Error page";)
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(err.status || 500);

  //checking whether user want html or json (ill make both route for both users)
  if (res.locals.html) {
    //html response
    res.render("error", {
      title: "error page",
    });
  } else {
    //json response
    res.json(res.locals.error);
  }
}

module.exports = {
  //full way to write
  notFoundHandler: notFoundHandler,

  errorHandler,
  //^shortcut way to write^
};
