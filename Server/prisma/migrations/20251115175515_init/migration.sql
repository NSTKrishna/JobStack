/*
  Warnings:

  - You are about to drop the column `companyId` on the `Profile_companies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Profile_companies" DROP CONSTRAINT "Profile_companies_companyId_fkey";

-- DropIndex
DROP INDEX "public"."Profile_companies_companyId_key";

-- AlterTable
ALTER TABLE "public"."Profile_companies" DROP COLUMN "companyId";
