const { response } = require("express");
const user = require("../user");


const logout = (req, res) => {
  req.session.destroy(function(err) {
    res.clearCookie("jwt");
    res.status(200).json({alert:{type:"success",message:"You have Logout"}});
  });
};

const register = (req, res) => {
  if (req.body.password != req.body.confirmPassword) {
    return res.status(422).json(
    {
      password:"Password are not same",
    }) 
  } else {
    user
      .insertUser(req.body.name, req.body.username, req.body.password)
      .then((response) => {
        if (response) {
          const token = user.createToken(response);
          res.cookie("jwt", token);
          res.status(200).json({
            token:token,
            user: response,
            alert:{type:"success",message:"You have created new account."}
          });
        } else {
          return res.status(422).json({
            username:"This Username is already taken",
          });
        }
      })
     .catch(() => {
        return res.status(422).json({
          username:"This Username is already taken",
        }
       );
      });
  }
};


const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  user
    .checkUser(username, password)
    .then((response) => {
      if (response) {
        const token =  user.createToken(response);
        res.cookie("jwt",token);
        res.status(200).json({
          token:token,
          user: response,
          alert:{type:"success",message:"You have Login"}
        });
      } else {
        return res.status(422).json({
         loginError:"Username or Password is invaild.",
        });
      }
    })
    .catch(() => {
      return res.status(422).json({
        loginError:"Username or Password is invaild.",
      }
     );
    });
};

const editName = (req, res)=>{
  const name = req.body.name;
  const id = req.user.id;
  user
    .updateName(name, id)
    .then((response) =>{ 
       res.status(200).json({user:response, 
        alert:{type:"success",message:"Name updated"} });
    })
    .catch((error) => res.status(500).json(error));
};


const changePassword = (req, res) => {
  const oldPassword = req.body.oldPassword;
  const password = req.body.password;
  const id = req.user.id;
  user
    .changePassword(oldPassword, password , id)
    .then(() => {
        res.status(200).json({
          alert:{type:"success",message:"Password changed!"}
        });
    })
    .catch(() => {
      return res.status(422).json({
        oldPassword:"old Password is invaild.",
      }
     );
    });
};

const deleteAccount = (req, res) => {
  const id = req.user.id;
  user
      .deleteAccounts(id)
      .then(() =>res.status(200).json({type:"success", message:"Account Removed!"}))
      .catch(() => res.status(422).json({type:"error", message:"Unable to removed account!"}));


};

module.exports = {
  logout,
  register,
  login,
  editName,
  deleteAccount,
  changePassword
};
