-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brandName" TEXT NOT NULL,
    "groupModelName" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leasing" (
    "id" SERIAL NOT NULL,
    "leasingName" TEXT NOT NULL,
    "ratesPercentage" INTEGER NOT NULL,
    "term" INTEGER NOT NULL,

    CONSTRAINT "Leasing_pkey" PRIMARY KEY ("id")
);
