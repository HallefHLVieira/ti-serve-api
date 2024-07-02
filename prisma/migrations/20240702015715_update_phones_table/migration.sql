/*
  Warnings:

  - Added the required column `deleted_at` to the `phones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `phones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "phones" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_whatsapp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
