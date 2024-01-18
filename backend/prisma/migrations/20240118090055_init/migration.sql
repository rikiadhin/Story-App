/*
  Warnings:

  - You are about to alter the column `coverImage` on the `story` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `story` MODIFY `coverImage` VARCHAR(191) NOT NULL;
