const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3"
  },
  useNullAsDefault: true
  });

function TasksToDO(req, res) {
  knex
    .select("*")
    .from("tasks")
    .where("user_id", req.user.id)
    .where("completed", "undone")
    .then((tasksToDO) => {
      return res.json(tasksToDO);
    });
}
function TasksCompleted(req, res) {
  knex
    .select("*")
    .from("tasks")
    .where("user_id", req.user.id)
    .where("completed", "done")
    .then((tasksCompleted) => {
      return res.json(tasksCompleted);
    });
}

function createTasks(req, res) {
  const payload = req.body;
  knex("tasks")
    .insert({ ...payload, user_id: req.user.id })
    .then(() => res.status(200).json({ alert:{type:"success",message:"You have created new task."}}))
    .catch((error) => res.status(500).json(error));
}

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

module.exports = {
  TasksToDO,
  TasksCompleted,
  createTasks,
  markAsDone,
  deletetask,
};
