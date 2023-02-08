const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

async function seed() {
  console.log("🌱  Seeding...");

  const cars = JSON.parse(
    fs.readFileSync(`${__dirname}/data/cars.json`, "utf-8")
  );

  const leasings = JSON.parse(
    fs.readFileSync(`${__dirname}/data/leasings.json`, "utf-8")
  );

  await prisma.car.deleteMany();
  for (const car of cars) {
    await prisma.car.create({
      data: car,
    });
  }

  await prisma.leasing.deleteMany();
  for (const leasing of leasings) {
    await prisma.leasing.create({
      data: leasing,
    });
  }
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
