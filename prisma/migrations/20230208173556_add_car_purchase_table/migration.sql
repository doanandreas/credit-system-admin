-- CreateTable
CREATE TABLE "CarPurchase" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "leasingId" INTEGER NOT NULL,
    "creditDuration" INTEGER NOT NULL,

    CONSTRAINT "CarPurchase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarPurchase" ADD CONSTRAINT "CarPurchase_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarPurchase" ADD CONSTRAINT "CarPurchase_leasingId_fkey" FOREIGN KEY ("leasingId") REFERENCES "Leasing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
