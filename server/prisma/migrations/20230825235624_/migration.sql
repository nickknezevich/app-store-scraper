/*
  Warnings:

  - You are about to drop the column `appId` on the `app_informations` table. All the data in the column will be lost.
  - You are about to drop the column `developerId` on the `app_informations` table. All the data in the column will be lost.
  - You are about to drop the column `developerUrl` on the `app_informations` table. All the data in the column will be lost.
  - You are about to drop the column `free` on the `app_informations` table. All the data in the column will be lost.
  - You are about to drop the column `genresIds` on the `app_informations` table. All the data in the column will be lost.
  - Added the required column `app_id` to the `app_informations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `developer_id` to the `app_informations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `developer_url` to the `app_informations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_free` to the `app_informations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `app_informations` DROP COLUMN `appId`,
    DROP COLUMN `developerId`,
    DROP COLUMN `developerUrl`,
    DROP COLUMN `free`,
    DROP COLUMN `genresIds`,
    ADD COLUMN `app_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `developer_id` INTEGER NOT NULL,
    ADD COLUMN `developer_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `genres_ids` JSON NULL,
    ADD COLUMN `is_free` BOOLEAN NOT NULL;
