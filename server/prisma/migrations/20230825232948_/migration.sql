/*
  Warnings:

  - You are about to drop the column `genre` on the `app_informations` table. All the data in the column will be lost.
  - You are about to drop the column `genreId` on the `app_informations` table. All the data in the column will be lost.
  - Added the required column `genres` to the `app_informations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genresIds` to the `app_informations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `app_informations` DROP COLUMN `genre`,
    DROP COLUMN `genreId`,
    ADD COLUMN `genres` JSON NOT NULL,
    ADD COLUMN `genresIds` JSON NOT NULL;
