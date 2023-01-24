//external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
//internal imports
const User = require("../models/People");

// get login page
function getLogin(req, res, next) {
  res.render("index");
}

//do login
async function login(req, res, next) {
  try {
    //find user email/username
    const user = await User.findOne({
      //mongoose or operator
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      //comparing my hashed passowrd with compare bcrypt method
      const isValidPassowrd = await bcrypt.compare(
        //this one is plain text
        req.body.password,
        //this one what database saved in hashed
        user.password
      );

      if (isValidPassowrd) {
        //prerpare token
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        //generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        //set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        //setting logged in user local identidier
        res.locals.loggedInUser = userObject;

        res.render("inbox");
      } else {
        throw createError("Login failed!");
      }
    } else {
      throw createError("Login failed!");
    }
  } catch (err) {
    res.render("index", {
      //if users emtry wrong password thn he will redirect login
      //thn this local variable data will remember the name
      //user dont have to wirte name again -->
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

//logout
function logout (req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
}

module.exports = {
  getLogin,
  login,
  logout,
};
