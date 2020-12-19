const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const serveStatic = require("serve-static");
const middlewares = require("./middlewares");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("./setup.js");
const port = process.env.PORT || 8000;
const usersController = require("./apis/userController");
const TaskController = require("./apis/taskController.js");
const AdminController = require("./apis/adminController.js");
const jsonParser = bodyParser.json();
const database = require("./settings");

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials : true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(cors(corsOptions));

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3"
  },
  useNullAsDefault: true});

const KnexSessionStore = require("connect-session-knex")(session);
const store = new KnexSessionStore({
  knex,
});
app.locals.knex = knex;
app.set("port", port);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: "s3cr3t",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60 * 60 * 24 * 7,
    },
    store,
  })
);
app.use(serveStatic(path.join(__dirname, "public")));

app.get(
  "/tasks-to-do",
  middlewares.authenticate,
  jsonParser,
  TaskController.TasksToDO
);
app.get(
  "/tasks-completed",
  middlewares.authenticate,
  jsonParser,
  TaskController.TasksCompleted
);
// for admin
app.get(
  "/admin/all-tasks",
  middlewares.admin,
  jsonParser,
  AdminController.allTasks
);
app.get(
  "/admin/all-users",
  middlewares.admin,
  jsonParser,
  AdminController.allUser
);
app.delete(
  "/admin/delete-user/:userId",
  AdminController.deleteUser
);

app.post(
  "/add-task",
  middlewares.authenticate,
  jsonParser,
  TaskController.createTasks
);

app.patch(
  "/mark/:taskId",
  jsonParser,
  TaskController.markAsDone
);

app.delete(
  "/delete/:taskId",
  TaskController.deletetask
);

app.post(
  "/edit-name",
  jsonParser,
  middlewares.authenticate,
  usersController.editName
);
app.post(
  "/change-password",
  jsonParser,
  middlewares.authenticate,
  usersController.changePassword
);

app.delete(
  "/delete-account",
  jsonParser,
  middlewares.authenticate,
  usersController.deleteAccount
);

app.post("/login", jsonParser, usersController.login);
app.post("/logout", jsonParser, usersController.logout);
app.post("/register", jsonParser, usersController.register);

app.use(middlewares.notFound);
app.listen(app.get("port"), () =>
  console.log(`Server running on ${app.get("port")}`)
);
