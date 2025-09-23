-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `CIN` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Company_CIN_key`(`CIN`),
    UNIQUE INDEX `Company_email_key`(`email`),
    UNIQUE INDEX `Company_company_key`(`company`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
