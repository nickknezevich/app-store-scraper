/*
  Warnings:

  - You are about to alter the column `id` on the `app_reviews` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `app_reviews` MODIFY `id` INTEGER UNSIGNED NOT NULL;
