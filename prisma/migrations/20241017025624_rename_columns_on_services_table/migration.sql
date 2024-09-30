/*
  Warnings:

  - You are about to drop the column `banner_url` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "banner_url",
ADD COLUMN     "banner_key" TEXT;
