/*
  Warnings:

  - You are about to drop the `Phone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_service_id_fkey";

-- DropTable
DROP TABLE "Phone";

-- CreateTable
CREATE TABLE "phones" (
    "id" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "phones_number_key" ON "phones"("number");

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
