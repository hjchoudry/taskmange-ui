const database ={
  client: "postgres",
  connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1234',
      database : 'task',
  },
  useNullAsDefault: true
};

module.exports = database;