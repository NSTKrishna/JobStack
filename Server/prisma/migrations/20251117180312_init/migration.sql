/*
  Warnings:

  - You are about to drop the column `email` on the `Show_Company` table. All the data in the column will be lost.
  - Added the required column `industry` to the `Show_Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Show_Company_email_key";

-- AlterTable
ALTER TABLE "public"."Show_Company" DROP COLUMN "email",
ADD COLUMN     "industry" VARCHAR(100) NOT NULL;
