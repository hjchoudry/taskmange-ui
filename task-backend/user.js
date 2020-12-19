const bcrypt = require("bcrypt");
const database = require("./settings");
const jwt = require("jsonwebtoken");

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3"
  },
useNullAsDefault: true
});

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (error, hash) => {
      error ? reject(error) : resolve(hash);
    });
  });
};

const checkPassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, response) => {
      if (error) {
        reject(error);
      } else if (response) {
        resolve(response);
      } else {
        reject("Incorrect password");
      }
    });
  });
};

const createToken = (payload) => {
  const secret = "s3cr3t"; // process.env.secret
  const expiresIn = 1000 * 60 * 60 * 24 * 7;
  const token = jwt.sign({ payload }, secret, { expiresIn });
  return token;
};

function insertUser(name, username, password) {
  return hashPassword(password).then((hash) => {
    return knex("users")
      .where({
        username,
      })
      .then((response) => {
        if (response.length > 0) {
          throw new Error("This Username is already taken");
        } else {
          return knex("users")
            .insert({ name, username, password: hash })
            .then((response) => {
              return knex
                .select("*")
                .from("users")
                .where("username", username)
                .first();
            });
        }
      });
  });
}

function checkUser(username, password) {
  let user = null;
  return knex("users")
    .where({
      username,
    })
    .then((response) => {
      if (response.length > 0) {
        user = response[0];
        return checkPassword(password, response[0].password);
      }
    })
    .then((response) => {
      if (response) {
        delete user.password;
        return user;
      } else {
        return false;
      }
    });
}

function updateName(name , id) {
           return knex("users")
            .update({name})
            .where("id", id)
            .then(() => {
              return knex
                .select("*")
                .from("users")
                .where("id", id)
                .first();
            });
}
function changePassword(oldPassword, password , id) {
  let user = null;
  return knex("users")
    .where("id", id)
    .then((response) => {
      if (response.length > 0) {
        user = response[0];
        return checkPassword(oldPassword, response[0].password).then((ok)=>{
          if (ok){
        hashPassword(password).then((hash) => {
          knex("users")
          .update({ password: hash})
          .where("id", id)
          .then(() => {
            return true
          });

       })}else return false

  })
      }
    })
}
function deleteAccounts(userId) {
  return knex("users")
         .where("id", userId)
         .del()
         .then(() => {
          return true
        });
}
module.exports = {
  insertUser,
  checkUser,
  createToken,
  updateName,
  changePassword,
  deleteAccounts
};

