/*
  Warnings:

  - Added the required column `histogram` to the `app_ratings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ratings` to the `app_ratings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `app_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `app_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `app_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `app_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_url` to the `app_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `app_reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `version` to the `app_reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `app_ratings` ADD COLUMN `histogram` JSON NOT NULL,
    ADD COLUMN `ratings` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `app_reviews` ADD COLUMN `score` INTEGER NOT NULL,
    ADD COLUMN `text` TEXT NOT NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    ADD COLUMN `version` VARCHAR(191) NOT NULL;
