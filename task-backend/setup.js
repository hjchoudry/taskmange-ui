const database = require("./settings");

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3"
  },
useNullAsDefault: true});

knex.schema
  .hasTable("users")
  .then(exists => {
    if (!exists) {
      return knex.schema
        .createTable("users", table => {
          table.increments("id");
          table.string("name");
          table.string("username");
          table.string("password");
          table.string("type").defaultTo("user");
        })
        .then(() => console.info("Users table created"))
        .catch(error => console.error(error));
    }
  })
  .catch(error => console.error(error));

knex.schema
  .hasTable("tasks")
  .then(exists => {
    if (!exists) {
      return knex.schema
        .createTable("tasks", table => {
          table.increments("id");
          table.string("title");
          table.string("details");
          table.string("completed").defaultTo("undone");
          table.string("time");
          table.string("date");
          table.string("user_id");
        })
        .then(() => console.info("task table created"))
        .catch(error => console.error(error));
    }
  })
  .catch(error => console.error(error));
