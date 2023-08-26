/*
  Warnings:

  - A unique constraint covering the columns `[app_information_id]` on the table `app_ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `app_ratings_app_information_id_key` ON `app_ratings`(`app_information_id`);
