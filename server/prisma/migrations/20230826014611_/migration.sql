/*
  Warnings:

  - The primary key for the `app_reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `app_reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `app_reviews` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `app_reviews_id_key` ON `app_reviews`(`id`);
