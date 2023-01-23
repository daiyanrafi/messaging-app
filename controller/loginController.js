//external imports
const bcrypt = require("bcrypt");
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
      $or: [{ email: req.body.username}, { mobile: req.body.username}],
    });

    if(user && user._id) {
      //comparing my hashed passowrd with compare bcrypt method
      const isValidPassowrd = await bcrypt.compare(
        //this one is plain text
        req.body.password,
        //this one what database saved in hashed
        user.password
      );

      if(isValidPassowrd) {
        //prerpare token
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        //generate token 
        const token = jwt.sign(userObject, )
      } else {
      }
    } else {

    }
     
  } catch (err) {

  }
}

module.exports = {
  getLogin,
};
