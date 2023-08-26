/*
  Warnings:

  - The primary key for the `app_ratings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `app_ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `app_ratings` DROP PRIMARY KEY,
    MODIFY `id` BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `app_ratings_id_key` ON `app_ratings`(`id`);
