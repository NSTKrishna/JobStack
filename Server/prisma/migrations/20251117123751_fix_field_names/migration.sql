/*
  Warnings:

  - You are about to drop the column `CreatedAt` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `College` table. All the data in the column will be lost.
  - You are about to drop the column `CIN` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `Company` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `CompanyId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `Department` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `JobTitle` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `JobType` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `Location` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `Requirement` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `Salary` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `Company_Name` on the `Profile_companies` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Profile_companies` table. All the data in the column will be lost.
  - You are about to drop the column `Industry` on the `Profile_companies` table. All the data in the column will be lost.
  - You are about to drop the column `Location` on the `Profile_companies` table. All the data in the column will be lost.
  - You are about to drop the column `Size` on the `Profile_companies` table. All the data in the column will be lost.
  - You are about to drop the column `CollegeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `CreatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Enrollment` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `College` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cin]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[company]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[enrollment]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `College` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cin` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobDescription` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobTitle` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobType` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salaryRange` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyName` to the `Profile_companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Profile_companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Profile_companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Profile_companies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `enrollment` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_CompanyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_CollegeId_fkey";

-- DropIndex
DROP INDEX "public"."College_Name_key";

-- DropIndex
DROP INDEX "public"."Company_CIN_key";

-- DropIndex
DROP INDEX "public"."Company_Company_key";

-- DropIndex
DROP INDEX "public"."Company_Email_key";

-- DropIndex
DROP INDEX "public"."User_Email_key";

-- DropIndex
DROP INDEX "public"."User_Enrollment_key";

-- AlterTable
ALTER TABLE "public"."College" DROP COLUMN "CreatedAt",
DROP COLUMN "Name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Company" DROP COLUMN "CIN",
DROP COLUMN "Company",
DROP COLUMN "Email",
DROP COLUMN "Name",
DROP COLUMN "Password",
ADD COLUMN     "cin" TEXT NOT NULL,
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "CompanyId",
DROP COLUMN "CreatedAt",
DROP COLUMN "Department",
DROP COLUMN "Description",
DROP COLUMN "JobTitle",
DROP COLUMN "JobType",
DROP COLUMN "Location",
DROP COLUMN "Requirement",
DROP COLUMN "Salary",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "department" TEXT NOT NULL,
ADD COLUMN     "jobDescription" VARCHAR(500) NOT NULL,
ADD COLUMN     "jobTitle" TEXT NOT NULL,
ADD COLUMN     "jobType" TEXT NOT NULL,
ADD COLUMN     "location" VARCHAR(100) NOT NULL,
ADD COLUMN     "requirements" VARCHAR(500) NOT NULL,
ADD COLUMN     "salaryRange" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "public"."Profile_companies" DROP COLUMN "Company_Name",
DROP COLUMN "Description",
DROP COLUMN "Industry",
DROP COLUMN "Location",
DROP COLUMN "Size",
ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "industry" TEXT NOT NULL DEFAULT 'general',
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "CollegeId",
DROP COLUMN "CreatedAt",
DROP COLUMN "Email",
DROP COLUMN "Enrollment",
DROP COLUMN "Name",
DROP COLUMN "Password",
ADD COLUMN     "collegeId" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "enrollment" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "College_name_key" ON "public"."College"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_cin_key" ON "public"."Company"("cin");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "public"."Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_company_key" ON "public"."Company"("company");

-- CreateIndex
CREATE UNIQUE INDEX "User_enrollment_key" ON "public"."User"("enrollment");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
