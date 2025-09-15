/*
  Warnings:

  - A unique constraint covering the columns `[googleId]` on the table `Oficina` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Oficina` ADD COLUMN `googleId` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NULL,
    ADD COLUMN `provider` VARCHAR(191) NOT NULL DEFAULT 'manual',
    ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'oficina';

-- CreateIndex
CREATE UNIQUE INDEX `Oficina_googleId_key` ON `Oficina`(`googleId`);
