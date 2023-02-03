const Sequelize = require("sequelize");
const sequelize = require("../models");
const Tutorial = sequelize.define("tutorial", {
  title: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  published: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Tutorial;
