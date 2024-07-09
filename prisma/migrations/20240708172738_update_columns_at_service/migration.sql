/*
  Warnings:

  - Made the column `description` on table `services` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "services" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "deleted_at" DROP NOT NULL;
