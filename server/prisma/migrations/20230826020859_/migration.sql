/*
  Warnings:

  - You are about to alter the column `id` on the `app_reviews` table. The data in that column could be lost. The data in that column will be cast from `UnsignedInt` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `app_reviews` MODIFY `id` BIGINT NOT NULL;
