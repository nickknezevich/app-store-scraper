/*
  Warnings:

  - You are about to alter the column `id` on the `app_ratings` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- DropIndex
DROP INDEX `app_ratings_id_key` ON `app_ratings`;

-- AlterTable
ALTER TABLE `app_ratings` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
