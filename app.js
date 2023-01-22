//external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

//internal imports
const { notFoundHandler, errorHandler } = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();


//database connection
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Database Conntcted!"))
.catch(err => console.log(err));

//request parser
//req ashle parse korte hoy like from data.json data
app.use(express.json());
                         //  html from handling - urlencoded and extended 
                       //  true means queryparameter accept korar jonno.
app.use(express.urlencoded({ extended: true }));

//view engine ejs setup
app.set("view engine", "ejs");

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookie (its a secred thing for authentication)
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/inbox', inboxRouter);

//ERROR HANDLING (404 not found)
app.use(notFoundHandler);

//common error handler
app.use(errorHandler);


//server call
app.listen(process.env.PORT, () => {
  console.log(`app is listing at port ${process.env.PORT}`);
});