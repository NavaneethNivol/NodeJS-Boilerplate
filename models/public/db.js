const Sequelize = require('sequelize');
var config = require("../../config/config");

var env = config.db.env;

const sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  dialect: env.DATABASE_DIALECT,
  schema: env.SCHEMA,
  define: {
    underscored: true
  }
});

// Connect all the models/tables in the database to a db object,
// So everything is accessible via one object

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

//Models/tables
db.login = require('./login.js')(sequelize, Sequelize);
db.kv = require('./kvStore.js')(sequelize, Sequelize);

//Relations
// db.profile.belongsTo(db.login, {onDelete: "CASCADE"});

module.exports = db;
