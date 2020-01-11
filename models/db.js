const Sequelize = require('sequelize');
var config = require("../config/config");

const db = {};

db.Sequelize = Sequelize; // For easier querying.
db.Op = Sequelize.Op; // Very important
db.public = require("./public/db");
 
// Define all relationships here, and not in the individual files

// Relations
// db.public.permissions.belongsTo(db.public.login, {onDelete: 'CASCADE'});
// db.public.permissions.belongsTo(db.public.login, {onDelete: 'CASCADE', as: 'created_by'});
db.public.kv.belongsTo(db.public.login)

module.exports = db;
