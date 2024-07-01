/*
  Warnings:

  - You are about to drop the `Evaluation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Evaluation";

-- CreateTable
CREATE TABLE "evaluations" (
    "id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "evaluations_pkey" PRIMARY KEY ("id")
);
