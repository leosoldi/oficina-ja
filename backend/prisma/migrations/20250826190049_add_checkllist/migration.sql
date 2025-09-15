-- CreateTable
CREATE TABLE `Checklist` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `isTemplate` BOOLEAN NOT NULL DEFAULT false,
    `assignedToMotoristaId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Checklist_assignedToMotoristaId_idx`(`assignedToMotoristaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChecklistItem` (
    `id` VARCHAR(191) NOT NULL,
    `checklistId` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `required` BOOLEAN NOT NULL DEFAULT false,
    `completed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Checklist` ADD CONSTRAINT `Checklist_assignedToMotoristaId_fkey` FOREIGN KEY (`assignedToMotoristaId`) REFERENCES `Motorista`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChecklistItem` ADD CONSTRAINT `ChecklistItem_checklistId_fkey` FOREIGN KEY (`checklistId`) REFERENCES `Checklist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
