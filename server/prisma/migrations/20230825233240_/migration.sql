/*
  Warnings:

  - You are about to alter the column `developerId` on the `app_informations` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `app_informations` MODIFY `developerId` INTEGER NOT NULL;
