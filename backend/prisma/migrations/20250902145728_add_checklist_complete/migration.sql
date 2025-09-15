/*
  Warnings:

  - The primary key for the `ChecklistItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ChecklistItem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Checklist` DROP FOREIGN KEY `Checklist_assignedToMotoristaId_fkey`;

-- DropForeignKey
ALTER TABLE `ChecklistItem` DROP FOREIGN KEY `ChecklistItem_checklistId_fkey`;

-- DropIndex
DROP INDEX `Checklist_assignedToMotoristaId_idx` ON `Checklist`;

-- DropIndex
DROP INDEX `ChecklistItem_checklistId_fkey` ON `ChecklistItem`;

-- AlterTable
ALTER TABLE `Checklist` ADD COLUMN `completedAt` DATETIME(3) NULL,
    ADD COLUMN `notes` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'OPEN',
    MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `ChecklistItem` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `ChecklistItem` ADD CONSTRAINT `ChecklistItem_checklistId_fkey` FOREIGN KEY (`checklistId`) REFERENCES `Checklist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
