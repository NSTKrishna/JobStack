-- CreateTable
CREATE TABLE "public"."Show_Company" (
    "id" SERIAL NOT NULL,
    "companyName" VARCHAR(100) NOT NULL,
    "website" VARCHAR(100) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "size" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Show_Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Show_Job" (
    "id" SERIAL NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "salary" INTEGER NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "requirement" VARCHAR(500) NOT NULL,

    CONSTRAINT "Show_Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Show_Company_email_key" ON "public"."Show_Company"("email");
