const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3"
  },
  useNullAsDefault: true
  });

const markAsDone = (req, res) => {
  const  {taskId } = req.params;
  knex("tasks")
    .where("id", taskId)
    .update("completed", "done")
    .then(() => res.status(201).json({type:"success", message:"Task mark as done!"}))
    .catch(() => res.status(500).json({type:"error", message:"Unable to mark as done!"}));
};

const deletetask = (req, res) => {
  const { taskId } = req.params;
  knex("tasks")
    .where("id", taskId)
    .del()
    .then(() =>res.status(201).json({type:"success", message:"Task Removed!"}))
    .catch(() => res.status(500).json({type:"error", message:"Unable to removed task!"}));
};
const deleteUser = (req, res) => {
  const { userId } = req.params;
  knex("tasks")
    .where("id", userId)
    .del()
    .then(() =>res.status(201).json({type:"success", message:"User Removed!"}))
    .catch(() => res.status(500).json({type:"error", message:"Unable to removed user!"}));
};

function allTasks(req, res) {
  knex
    .select("*")
    .from("tasks")
    .join("users", "tasks.user_id", "=", "users.id")
    .then((allTasks) => {
      return res.json(allTasks);
    }); 
}
function allUser(req, res) {
  knex
    .select("*")
    .from("users")
    .then((users) => {
      return res.json(users);
    }); 
}
module.exports = {
  markAsDone,
  deletetask,
  allTasks,
  allUser,
  deleteUser
};
