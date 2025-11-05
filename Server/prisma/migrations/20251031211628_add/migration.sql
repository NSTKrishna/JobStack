-- CreateTable
CREATE TABLE "public"."Profile_user" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "experience" VARCHAR(100) NOT NULL,
    "summary" VARCHAR(500) NOT NULL,

    CONSTRAINT "Profile_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_email_key" ON "public"."Profile_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_phone_key" ON "public"."Profile_user"("phone");
