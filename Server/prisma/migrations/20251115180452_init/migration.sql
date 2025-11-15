/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `Profile_companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Profile_companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Profile_companies" ADD COLUMN     "companyId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_companies_companyId_key" ON "public"."Profile_companies"("companyId");

-- AddForeignKey
ALTER TABLE "public"."Profile_companies" ADD CONSTRAINT "Profile_companies_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
