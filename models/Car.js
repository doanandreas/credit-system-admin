const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Car = sequelize.define("Car", {
  brandName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groupModelName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.brandName} ${this.groupModelName} ${this.modelName}`;
    },
    set(_) {
      throw new Error("Virtual attribute 'fullName' not to set");
    },
  },
});

module.exports = Car;
