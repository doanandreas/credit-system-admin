"use strict";
const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let leasings = JSON.parse(
      fs.readFileSync(`${__dirname}/_data/leasings.json`, "utf-8")
    );

    leasings = leasings.map((leasing) => ({
      ...leasing,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }));

    await queryInterface.bulkInsert("Leasings", leasings);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Leasings", null, {});
  },
};
