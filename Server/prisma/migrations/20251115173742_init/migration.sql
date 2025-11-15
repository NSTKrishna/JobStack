/*
  Warnings:

  - You are about to drop the column `Email` on the `Profile_companies` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Profile_users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Profile_companies_Email_key";

-- DropIndex
DROP INDEX "public"."Profile_users_Email_key";

-- AlterTable
ALTER TABLE "public"."Profile_companies" DROP COLUMN "Email",
ADD COLUMN     "Industry" VARCHAR(50) NOT NULL DEFAULT 'general';

-- AlterTable
ALTER TABLE "public"."Profile_users" DROP COLUMN "Email";
