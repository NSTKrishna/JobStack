/*
  Warnings:

  - You are about to drop the column `createdAt` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Job` table. All the data in the column will be lost.
  - You are about to alter the column `Location` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `Description` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to alter the column `Requirement` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to drop the column `collegeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `enrollment` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[Name]` on the table `College` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Email]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Company]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Enrollment]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Name` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Company` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Password` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CompanyId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Enrollment` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_companyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_collegeId_fkey";

-- DropIndex
DROP INDEX "public"."College_name_key";

-- DropIndex
DROP INDEX "public"."Company_company_key";

-- DropIndex
DROP INDEX "public"."Company_email_key";

-- DropIndex
DROP INDEX "public"."User_email_key";

-- DropIndex
DROP INDEX "public"."User_enrollment_key";

-- AlterTable
ALTER TABLE "public"."College" DROP COLUMN "createdAt",
DROP COLUMN "name",
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "company",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "Company" TEXT NOT NULL,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "Password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "companyId",
ADD COLUMN     "CompanyId" INTEGER NOT NULL,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "Location" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "Description" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "Requirement" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "collegeId",
DROP COLUMN "createdAt",
DROP COLUMN "email",
DROP COLUMN "enrollment",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "CollegeId" INTEGER,
ADD COLUMN     "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "Enrollment" TEXT NOT NULL,
ADD COLUMN     "Name" TEXT NOT NULL,
ADD COLUMN     "Password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Profile_users" (
    "id" SERIAL NOT NULL,
    "First_Name" VARCHAR(50) NOT NULL,
    "Last_Name" VARCHAR(50) NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "City" VARCHAR(50) NOT NULL,
    "Experience" VARCHAR(100) NOT NULL,
    "Summary" VARCHAR(500) NOT NULL,

    CONSTRAINT "Profile_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Profile_companies" (
    "id" SERIAL NOT NULL,
    "Company_Name" VARCHAR(100) NOT NULL,
    "website" VARCHAR(100) NOT NULL,
    "Location" VARCHAR(100) NOT NULL,
    "Description" VARCHAR(500) NOT NULL,
    "Size" VARCHAR(50) NOT NULL,
    "Email" TEXT NOT NULL,

    CONSTRAINT "Profile_companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_users_Email_key" ON "public"."Profile_users"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_users_Phone_key" ON "public"."Profile_users"("Phone");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_companies_Email_key" ON "public"."Profile_companies"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "College_Name_key" ON "public"."College"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_Email_key" ON "public"."Company"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_Company_key" ON "public"."Company"("Company");

-- CreateIndex
CREATE UNIQUE INDEX "User_Enrollment_key" ON "public"."User"("Enrollment");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "public"."User"("Email");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_CollegeId_fkey" FOREIGN KEY ("CollegeId") REFERENCES "public"."College"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_CompanyId_fkey" FOREIGN KEY ("CompanyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
