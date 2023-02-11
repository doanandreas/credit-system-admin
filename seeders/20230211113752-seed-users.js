"use strict";
const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8"));

    users = users.map((user) => ({
      ...user,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }));

    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
