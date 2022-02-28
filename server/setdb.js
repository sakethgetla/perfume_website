const knex = require("knex");

const connectedKnex = knex({
  client: 'sqlite3',
  connection: {
    filename: "./server/data/ffs.db"
  }
});

connectedKnex.raw("PRAGMA foreign_keys = ON;").then(() => {
    console.log("Foreign Key Check activated.");
});
    //filename: "./server/test.db"
module.exports = connectedKnex;
