/*
  Warnings:

  - You are about to drop the column `description` on the `evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `evaluations` table. All the data in the column will be lost.
  - You are about to drop the column `validated_at` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `validated_at` on the `users` table. All the data in the column will be lost.
  - Added the required column `service_id` to the `evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "evaluations" DROP CONSTRAINT "evaluations_serviceId_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "evaluations" DROP COLUMN "description",
DROP COLUMN "note",
DROP COLUMN "serviceId",
ADD COLUMN     "liked" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "service_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "validated_at",
ADD COLUMN     "is_valid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "neighborhood" TEXT NOT NULL DEFAULT 'Benderville',
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zip_code" TEXT,
ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "email",
DROP COLUMN "validated_at",
ADD COLUMN     "is_valid" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Phone" (
    "id" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Phone_number_key" ON "Phone"("number");

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
