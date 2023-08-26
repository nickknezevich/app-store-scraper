/*
  Warnings:

  - You are about to drop the `SyncEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `SyncEntry`;

-- CreateTable
CREATE TABLE `sync_entries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sync_uuid` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
