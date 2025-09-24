-- CreateTable
CREATE TABLE "public"."College" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "enrollment" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "collegeId" INTEGER,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "CIN" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "company" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "College_name_key" ON "public"."College"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_enrollment_key" ON "public"."User"("enrollment");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_CIN_key" ON "public"."Company"("CIN");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "public"."Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_company_key" ON "public"."Company"("company");

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "public"."College"("id") ON DELETE SET NULL ON UPDATE CASCADE;
