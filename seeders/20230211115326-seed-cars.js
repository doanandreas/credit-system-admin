"use strict";
const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let cars = JSON.parse(fs.readFileSync(`${__dirname}/_data/cars.json`, "utf-8"));

    cars = cars.map((car) => ({
      ...car,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }));

    await queryInterface.bulkInsert("Cars", cars);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cars", null, {});
  },
};
