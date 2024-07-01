/*
  Warnings:

  - You are about to drop the column `boss_id` on the `services` table. All the data in the column will be lost.
  - Added the required column `note` to the `evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `evaluations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "evaluations" ADD COLUMN     "description" TEXT,
ADD COLUMN     "note" INTEGER NOT NULL,
ADD COLUMN     "serviceId" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "boss_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evaluations" ADD CONSTRAINT "evaluations_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
