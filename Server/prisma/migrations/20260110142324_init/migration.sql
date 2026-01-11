/*
  Warnings:

  - The `status` column on the `Applications` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Profile_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Show_Company` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Show_Job` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,jobId]` on the table `Applications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Applications` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ApplicationStatus" AS ENUM ('PENDING', 'SHORTLISTED', 'REJECTED', 'HIRED');

-- AlterTable
ALTER TABLE "public"."Applications" ADD COLUMN     "companyId" INTEGER NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."ApplicationStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "public"."Profile_user";

-- DropTable
DROP TABLE "public"."Profile_users";

-- DropTable
DROP TABLE "public"."Show_Company";

-- DropTable
DROP TABLE "public"."Show_Job";

-- CreateIndex
CREATE UNIQUE INDEX "Applications_userId_jobId_key" ON "public"."Applications"("userId", "jobId");

-- AddForeignKey
ALTER TABLE "public"."Applications" ADD CONSTRAINT "Applications_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
