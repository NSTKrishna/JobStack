-- CreateTable
CREATE TABLE "public"."Job" (
    "id" SERIAL NOT NULL,
    "JobTitle" TEXT NOT NULL,
    "JobType" TEXT NOT NULL,
    "Department" TEXT NOT NULL,
    "Location" TEXT NOT NULL,
    "Salary" INTEGER NOT NULL,
    "Description" TEXT NOT NULL,
    "Requirement" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
