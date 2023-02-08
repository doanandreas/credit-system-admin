const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

async function seed() {
  console.log("🌱  Seeding...");

  const cars = JSON.parse(
    fs.readFileSync(`${__dirname}/data/cars.json`, "utf-8")
  );

  await prisma.car.deleteMany()
  for (const car of cars) {
    await prisma.car.create({
      data: car,
    });
  }
}

seed()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });