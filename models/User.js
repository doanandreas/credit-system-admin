const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

module.exports = User;
