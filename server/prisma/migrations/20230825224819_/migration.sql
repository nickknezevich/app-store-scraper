-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `full_name` VARCHAR(255) NULL,
    `image_url` VARCHAR(255) NULL,
    `roles` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SyncEntry` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_informations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `appId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `free` BOOLEAN NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `developer` VARCHAR(191) NOT NULL,
    `developerUrl` VARCHAR(191) NOT NULL,
    `developerId` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `genreId` VARCHAR(191) NOT NULL,
    `released` DATETIME(3) NOT NULL,
    `updated` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_ratings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `app_information_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `app_information_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `app_ratings` ADD CONSTRAINT `app_ratings_app_information_id_fkey` FOREIGN KEY (`app_information_id`) REFERENCES `app_informations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `app_reviews` ADD CONSTRAINT `app_reviews_app_information_id_fkey` FOREIGN KEY (`app_information_id`) REFERENCES `app_informations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
